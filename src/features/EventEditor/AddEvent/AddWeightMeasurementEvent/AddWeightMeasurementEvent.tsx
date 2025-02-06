import { Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryType,
    EntryWeightMeasurementVariant,
} from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';
import { WeightInput } from '../../common/WeightInput/WeightInput';

const eventType = EntryType.WeightMeasurement;

export const AddWeightMeasurementEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const [weightInput, setWeightInput] =
        useState<EntryWeightMeasurementVariant['params']['weightValue']>(0);

    const handleAddEvent = () => {
        const newEntry = addEntry(
            createNewEvent(() => {
                return {
                    entryType: eventType,
                    params: {
                        weightValue: weightInput,
                    },
                };
            })
        );

        void navigate(routes.eventView(newEntry.metadata.uid), {
            replace: true,
        });
    };

    const middle = (
        <>
            <WeightInput
                label="Measured weight"
                value={weightInput}
                onChange={(value) => {
                    setWeightInput(
                        typeof value === 'number' ? value : parseFloat(value)
                    );
                }}
            />
        </>
    );
    const actions = (
        <>
            <ResponsiveButton
                variant="primary"
                fullWidth
                onClick={handleAddEvent}
            >
                Add event
            </ResponsiveButton>
        </>
    );

    return (
        <>
            <EventCard eventType={eventType} middle={middle} footer={actions} />
            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </>
    );
};
