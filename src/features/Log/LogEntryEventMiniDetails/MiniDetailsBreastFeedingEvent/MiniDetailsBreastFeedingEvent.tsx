import { Group, parseThemeColor, Text, useMantineTheme } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconBrandMcdonalds } from '@tabler/icons-react';

interface MiniDetailsBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
}

export const MiniDetailsBreastFeedingEvent = (
    props: MiniDetailsBreastFeedingEventProps
) => {
    const { event } = props;
    const theme = useMantineTheme();

    const whichBreast = (() => {
        switch (event.params.type) {
            case 'LEFT_BREAST':
                return 'Left breast';
            case 'RIGHT_BREAST':
                return 'Right breast';
            case 'UNSPECIFIED':
                return 'Unspecified';
        }
    })();

    return (
        <>
            <Group gap="0.25rem">
                <IconBrandMcdonalds
                    size={16}
                    stroke={1.5}
                    color={parseThemeColor({ color: 'dark.2', theme }).value}
                />
                <Text c="dark.2">{whichBreast}</Text>
            </Group>
        </>
    );
};
