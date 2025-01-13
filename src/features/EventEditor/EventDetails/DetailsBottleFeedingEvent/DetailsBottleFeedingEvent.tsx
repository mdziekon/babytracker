import { Group, NumberFormatter, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconBabyBottle } from '@tabler/icons-react';

interface DetailsBottleFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BottleFeeding };
}

export const DetailsBottleFeedingEvent = (
    props: DetailsBottleFeedingEventProps
) => {
    const { event } = props;

    return (
        <>
            {event.params.fluidVolume !== undefined && (
                <Group>
                    <IconBabyBottle size={16} stroke={1.5} />
                    <Text>
                        Volume:{' '}
                        <NumberFormatter
                            thousandSeparator=" "
                            suffix="ml"
                            value={event.params.fluidVolume}
                        />
                    </Text>
                </Group>
            )}
        </>
    );
};
