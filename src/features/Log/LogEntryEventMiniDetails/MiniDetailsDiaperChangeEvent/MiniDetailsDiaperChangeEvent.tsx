import { Group, parseThemeColor, Text, useMantineTheme } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconDroplets, IconPoo, IconQuestionMark } from '@tabler/icons-react';

interface MiniDetailsDiaperChangeEventProps {
    event: LogEntry & { entryType: EntryType.DiaperChange };
}

export const MiniDetailsDiaperChangeEvent = (
    props: MiniDetailsDiaperChangeEventProps
) => {
    const { event } = props;
    const theme = useMantineTheme();

    return (
        <>
            {(event.params.reason === 'STOOL' ||
                event.params.reason === 'STOOL_AND_URINE') && (
                <Group gap="0.25rem">
                    <IconPoo
                        size={16}
                        stroke={1.5}
                        color={
                            parseThemeColor({ color: 'dark.2', theme }).value
                        }
                    />
                    <Text c="dark.2">Stool</Text>
                </Group>
            )}
            {(event.params.reason === 'URINE' ||
                event.params.reason === 'STOOL_AND_URINE') && (
                <Group gap="0.25rem">
                    <IconDroplets
                        size={16}
                        stroke={1.5}
                        color={
                            parseThemeColor({ color: 'dark.2', theme }).value
                        }
                    />
                    <Text c="dark.2">Urine</Text>
                </Group>
            )}
            {event.params.reason === 'OTHER' && (
                <Group gap="0.25rem">
                    <IconQuestionMark
                        size={16}
                        stroke={1.5}
                        color={
                            parseThemeColor({ color: 'dark.2', theme }).value
                        }
                    />
                    <Text c="dark.2">Other</Text>
                </Group>
            )}
        </>
    );
};
