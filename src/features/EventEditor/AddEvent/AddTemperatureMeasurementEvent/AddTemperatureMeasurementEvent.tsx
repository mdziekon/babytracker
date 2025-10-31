import { Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryType,
    LogEntry,
    TemperatureUnit,
} from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/components/EventCard/EventCard';
import { useCallback, useMemo } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/components/RecentEvents/RecentEvents';
import { useForm } from '@mantine/form';
import {
    TemperatureMeasurementEventFormSchema,
    temperatureMeasurementEventFormValidation,
} from '../../common/formSchemas/temperatureMeasurementEventForm.schema';
import { TemperatureInput } from '../../common/components/TemperatureInput/TemperatureInput';
import dayjs from 'dayjs';

const eventType = EntryType.TemperatureMeasurement;
const RECENT_EVENTS_DAYS_LIMIT = 3;
/**
 * TODO: Hardcoded unit for now,
 * later on allow users to select that globally
 */
const HARDCODED_TEMP_UNIT = TemperatureUnit.Celsius;

export const AddTemperatureMeasurementEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const nowStartOfDay = dayjs().startOf('day');

    const {
        onSubmit: onFormSubmit,
        key: formKey,
        getInputProps,
        getInputNode,
    } = useForm<TemperatureMeasurementEventFormSchema>({
        mode: 'uncontrolled',
        validate: temperatureMeasurementEventFormValidation,
        validateInputOnChange: true,
    });

    /**
     * Show all events from last X days. If nothing found,
     * do not show anything else
     * (temperature measurements from previous sicknesses are not that important).
     */
    const temperatureMeasurementRecentEventsFilterHandler = useCallback(
        (entries: LogEntry[]): LogEntry[] => {
            const recentEntriesByDays = entries.filter((entry) => {
                if (entry.entryType !== EntryType.TemperatureMeasurement) {
                    return false;
                }

                const entryCreatedAt = dayjs(entry.metadata.createdAt);

                const isWithinDateRange =
                    nowStartOfDay.diff(entryCreatedAt.startOf('day'), 'day') <
                    RECENT_EVENTS_DAYS_LIMIT + 1;

                return isWithinDateRange;
            });

            return recentEntriesByDays;
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

                                unit: HARDCODED_TEMP_UNIT,
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
            <Box mb={16}>
                <TemperatureInput
                    label="Measured temperature"
                    key={formKey('measurement')}
                    unit={HARDCODED_TEMP_UNIT}
                    {...getInputProps('measurement')}
                />
            </Box>
        </>
    );
    const actions = (
        <>
            <ResponsiveButton variant="primary" fullWidth type="submit">
                Add measurement
            </ResponsiveButton>
        </>
    );

    return (
        <form onSubmit={handleSubmit}>
            <EventCard eventType={eventType} middle={middle} footer={actions} />
            <Box mt={64}>
                <RecentEvents
                    eventType={eventType}
                    customFilterHandler={
                        temperatureMeasurementRecentEventsFilterHandler
                    }
                />
            </Box>
        </form>
    );
};
