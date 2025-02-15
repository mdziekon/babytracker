import { Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import { EntryType } from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/components/EventCard/EventCard';
import { useMemo } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/components/RecentEvents/RecentEvents';
import { WeightInput } from '../../common/components/WeightInput/WeightInput';
import { useForm } from '@mantine/form';
import {
    WeightMeasurementEventFormSchema,
    weightMeasurementEventFormValidation,
} from '../../common/formSchemas/weightMeasurementEventForm.schema';

const eventType = EntryType.WeightMeasurement;

export const AddWeightMeasurementEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const {
        onSubmit: onFormSubmit,
        key: formKey,
        getInputProps,
        getInputNode,
    } = useForm<WeightMeasurementEventFormSchema>({
        mode: 'uncontrolled',
        validate: weightMeasurementEventFormValidation,
        validateInputOnChange: true,
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
            <WeightInput
                label="Measured weight"
                key={formKey('weightValue')}
                {...getInputProps('weightValue')}
            />
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
                <RecentEvents eventType={eventType} />
            </Box>
        </form>
    );
};
