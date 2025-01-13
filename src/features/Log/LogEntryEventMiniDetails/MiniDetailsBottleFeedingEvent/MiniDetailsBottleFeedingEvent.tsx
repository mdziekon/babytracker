import {
    Group,
    NumberFormatter,
    parseThemeColor,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconBabyBottle } from '@tabler/icons-react';

interface MiniDetailsBottleFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BottleFeeding };
}

export const MiniDetailsBottleFeedingEvent = (
    props: MiniDetailsBottleFeedingEventProps
) => {
    const { event } = props;
    const theme = useMantineTheme();

    return (
        <>
            {event.params.fluidVolume !== undefined && (
                <Group gap="0.25rem">
                    <IconBabyBottle
                        size={16}
                        stroke={1.5}
                        color={
                            parseThemeColor({ color: 'dark.2', theme }).value
                        }
                    />
                    <Text c="dark.2">
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
