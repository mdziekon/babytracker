import { Group, NumberFormatter, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { IconBottle } from '@tabler/icons-react';

interface DetailsFluidTimedEventProps {
    event: LogEntry & {
        entryType: EntryType.BottleFeeding | EntryType.MilkPumping;
    };
}

export const DetailsFluidTimedEvent = (props: DetailsFluidTimedEventProps) => {
    const { event } = props;

    return (
        <>
            {event.params.fluidVolume !== undefined && (
                <Group>
                    <IconBottle size={16} stroke={1.5} />
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
