import { Autocomplete, Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryType,
    MedicineDoseType,
} from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useMemo, useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';
import { useForm } from '@mantine/form';
import { MedicineDoseInput } from '../../common/MedicineDoseInput/MedicineDoseInput';
import { MedicineDoseTypeInput } from '../../common/MedicineDoseTypeInput/MedicineDoseTypeInput';
import {
    enableMedicineEventFormValidationEffects,
    medicineEventFormDefaultValues,
    MedicineEventFormSchema,
    medicineEventFormValidation,
} from '../../common/formSchemas/medicineEventForm.schema';
import { useUniqueMedicineKinds } from '../../common/utils/useUniqueMedicineKinds';

const eventType = EntryType.Medicine;

export const AddMedicineEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const allEntries = useAppStore((state) => state.data.logs);
    const navigate = useNavigate();

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
        initialValues: medicineEventFormDefaultValues,
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
                <RecentEvents eventType={eventType} />
            </Box>
        </form>
    );
};
