import { Box, NumberInput } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import {
    EntryBottleFeedingVariant,
    EntryMilkPumpingVariant,
    EntryType,
    LogEntry,
} from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { useState } from 'react';
import { EventDetails } from '../EventDetails/EventDetails';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';
import { ResponsiveStack } from '../../../common/design/ResponsiveStack';

interface FinishFluidTimedEventProps {
    event: LogEntry & {
        entryType: EntryType.BottleFeeding | EntryType.MilkPumping;
    };
}

export const FinishFluidTimedEvent = (props: FinishFluidTimedEventProps) => {
    const { event } = props;
    const editEntry = useAppStore((store) => store.api.editEntry);

    const [fluidVolumeInput, setFluidVolumeInput] =
        useState<
            (
                | EntryBottleFeedingVariant
                | EntryMilkPumpingVariant
            )['params']['fluidVolume']
        >(0);

    const handleFinishEventCounter = () => {
        const newEvent = structuredClone(event);

        newEvent.params.endedAt = new Date().toISOString();
        newEvent.params.fluidVolume = fluidVolumeInput;

        editEntry(event.metadata.uid, newEvent);
    };

    return (
        <EventCard
            eventType={event.entryType}
            middle={[
                <EventDetails event={event} />,
                <Box>
                    <NumberInput
                        rightSection={'ml'}
                        rightSectionPointerEvents="none"
                        label="Volume"
                        placeholder="50"
                        decimalScale={0}
                        max={9_999}
                        clampBehavior="strict"
                        thousandSeparator=" "
                        allowNegative={false}
                        value={fluidVolumeInput}
                        onChange={(value) => {
                            setFluidVolumeInput(
                                typeof value === 'number'
                                    ? value
                                    : parseFloat(value)
                            );
                        }}
                    />
                </Box>,
            ]}
            footer={
                <ResponsiveStack>
                    <ResponsiveButton
                        variant="filled"
                        color="pink"
                        fullWidth
                        onClick={handleFinishEventCounter}
                    >
                        Stop counter and save volume
                    </ResponsiveButton>
                </ResponsiveStack>
            }
        />
    );
};
