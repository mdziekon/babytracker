import { Box, Button, NumberInput } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import {
    EntryBottleFeedingVariant,
    EntryType,
    LogEntry,
} from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { useState } from 'react';
import { EventDetails } from '../EventDetails/EventDetails';

interface FinishBottleFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BottleFeeding };
}

export const FinishBottleFeedingEvent = (
    props: FinishBottleFeedingEventProps
) => {
    const { event } = props;
    const editEntry = useAppStore((store) => store.api.editEntry);

    const [fluidVolumeInput, setFluidVolumeInput] =
        useState<EntryBottleFeedingVariant['params']['fluidVolume']>(0);

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
                        label="Milk volume"
                        placeholder="50"
                        decimalScale={0}
                        maxLength={4}
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
                <>
                    <Button
                        variant="filled"
                        color="pink"
                        fullWidth
                        onClick={handleFinishEventCounter}
                    >
                        Stop counter and save milk volume
                    </Button>
                </>
            }
        />
    );
};
