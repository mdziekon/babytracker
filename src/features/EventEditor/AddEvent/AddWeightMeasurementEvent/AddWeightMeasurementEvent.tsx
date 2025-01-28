import { Box, NumberInput } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryType,
    EntryWeightMeasurementVariant,
} from '../../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';

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

        void navigate(routes.eventView(newEntry.metadata.uid));
    };

    return (
        <>
            <EventCard
                eventType={eventType}
                middle={
                    <>
                        <Box>
                            <NumberInput
                                rightSection={'g'}
                                rightSectionPointerEvents="none"
                                label="Measured weight"
                                placeholder="5000"
                                mt="md"
                                decimalScale={0}
                                max={99_999}
                                clampBehavior="strict"
                                thousandSeparator=" "
                                allowNegative={false}
                                value={weightInput}
                                onChange={(value) => {
                                    setWeightInput(
                                        typeof value === 'number'
                                            ? value
                                            : parseFloat(value)
                                    );
                                }}
                            />
                        </Box>
                    </>
                }
                footer={
                    <ResponsiveButton
                        variant="primary"
                        fullWidth
                        onClick={handleAddEvent}
                    >
                        Add event
                    </ResponsiveButton>
                }
            />
            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </>
    );
};
