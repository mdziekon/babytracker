import { NumberFormatter } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconBabyBottle } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsBottleFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BottleFeeding };
}

export const MiniDetailsBottleFeedingEvent = (
    props: MiniDetailsBottleFeedingEventProps
) => {
    const { event } = props;

    return (
        <>
            {event.params.fluidVolume !== undefined && (
                <MiniDetailsEntry
                    icon={<IconBabyBottle title="Milk volume" />}
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
