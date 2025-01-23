import { NumberFormatter } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconBottle } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsFluidTimedEventProps {
    event: LogEntry & {
        entryType: EntryType.BottleFeeding | EntryType.MilkPumping;
    };
}

export const MiniDetailsFluidTimedEvent = (
    props: MiniDetailsFluidTimedEventProps
) => {
    const { event } = props;

    return (
        <>
            {event.params.fluidVolume !== undefined && (
                <MiniDetailsEntry
                    icon={<IconBottle title="Volume" />}
                    title={
                        <NumberFormatter
                            thousandSeparator=" "
                            suffix="ml"
                            value={event.params.fluidVolume}
                        />
                    }
                />
            )}
        </>
    );
};
