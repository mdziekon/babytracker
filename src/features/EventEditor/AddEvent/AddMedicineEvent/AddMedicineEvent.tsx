import { Autocomplete, Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryType,
    LogEntry,
    MedicineDoseType,
} from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/components/EventCard/EventCard';
import { useCallback, useMemo, useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/components/RecentEvents/RecentEvents';
import { useForm } from '@mantine/form';
import { MedicineDoseInput } from '../../common/components/MedicineDoseInput/MedicineDoseInput';
import { MedicineDoseTypeInput } from '../../common/components/MedicineDoseTypeInput/MedicineDoseTypeInput';
import {
    enableMedicineEventFormValidationEffects,
    medicineEventFormDefaultValues,
    MedicineEventFormSchema,
    medicineEventFormValidation,
} from '../../common/formSchemas/medicineEventForm.schema';
import { useUniqueMedicineKinds } from '../../common/utils/useUniqueMedicineKinds';
import dayjs from 'dayjs';

const eventType = EntryType.Medicine;
const RECENT_EVENTS_DAYS_LIMIT = 3;
const RECENT_EVENTS_COUNT_LIMIT = 3;

export const AddMedicineEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const allEntries = useAppStore((state) => state.data.logs);
    const navigate = useNavigate();

    const nowStartOfDay = dayjs().startOf('day');

    const { knownMedicineNames, knownMedicineActiveSubstances } =
        useUniqueMedicineKinds(allEntries);

    const {
        onSubmit: onFormSubmit,
        key: formKey,
        getInputProps,
        getInputNode,
        watch,
        validateField,
    } = useForm<MedicineEventFormSchema>({
        mode: 'uncontrolled',
        validate: medicineEventFormValidation,
        validateInputOnChange: true,
    });

    const [selectedDoseType, setSelectedDoseType] = useState<MedicineDoseType>(
        medicineEventFormDefaultValues.doseType
    );

    watch('doseType', (input) => {
        setSelectedDoseType(input.value);
    });
    enableMedicineEventFormValidationEffects({
        watch,
        validateField,
    });

    /**
     * Show all events from last X days. If nothing found,
     * try to find Y most recent events of type ever.
     */
    const medicineRecentEventsFilterHandler = useCallback(
        (entries: LogEntry[]): LogEntry[] => {
            const recentEntriesByDays = entries.filter((entry) => {
                if (entry.entryType !== EntryType.Medicine) {
                    return false;
                }

                const entryCreatedAt = dayjs(entry.metadata.createdAt);

                const isWithinDateRange =
                    nowStartOfDay.diff(entryCreatedAt.startOf('day'), 'day') <
                    RECENT_EVENTS_DAYS_LIMIT + 1;

                return isWithinDateRange;
            });

            if (recentEntriesByDays.length) {
                return recentEntriesByDays;
            }

            return entries
                .filter((entry) => {
                    return entry.entryType === EntryType.Medicine;
                })
                .slice(0, RECENT_EVENTS_COUNT_LIMIT);
        },
        [nowStartOfDay]
    );

    const handleSubmit = useMemo(() => {
        return onFormSubmit(
            (values) => {
                const newEntry = addEntry(
                    createNewEvent(() => {
                        return {
                            entryType: eventType,
                            params: {
                                ...values,
                            },
                        };
                    })
                );

                void navigate(routes.eventView(newEntry.metadata.uid), {
                    replace: true,
                });
            },
            (errors) => {
                const firstErrorPath = Object.keys(errors)[0];
                getInputNode(firstErrorPath)?.focus();
            }
        );
    }, [addEntry, onFormSubmit, navigate, getInputNode]);

    const middle = (
        <>
            <Autocomplete
                label="Medicine name"
                placeholder="Eg. Nurofen"
                key={formKey('medicineName')}
                {...getInputProps('medicineName')}
                data={knownMedicineNames}
                comboboxProps={{ shadow: 'md' }}
                maxDropdownHeight={200}
            />
            <Autocomplete
                label="Medicine active substance"
                placeholder="Eg. Ibuprofen"
                mt="md"
                key={formKey('medicineActiveSubstance')}
                {...getInputProps('medicineActiveSubstance')}
                data={knownMedicineActiveSubstances}
                comboboxProps={{ shadow: 'md' }}
                maxDropdownHeight={200}
            />
            <MedicineDoseTypeInput
                label="Dose type"
                required
                mt="md"
                key={formKey('doseType')}
                {...getInputProps('doseType')}
            />
            <MedicineDoseInput
                label="Medicine dose"
                selectedDoseType={selectedDoseType}
                required
                mt="md"
                key={formKey('doseValue')}
                {...getInputProps('doseValue')}
            />
        </>
    );
    const actions = (
        <>
            <ResponsiveButton variant="primary" fullWidth type="submit">
                Add medicine dose
            </ResponsiveButton>
        </>
    );

    return (
        <form onSubmit={handleSubmit}>
            <EventCard eventType={eventType} middle={middle} footer={actions} />
            <Box mt={64}>
                <RecentEvents
                    eventType={eventType}
                    customFilterHandler={medicineRecentEventsFilterHandler}
                />
            </Box>
        </form>
    );
};
