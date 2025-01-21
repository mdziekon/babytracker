import { Group, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconDroplets, IconPoo, IconQuestionMark } from '@tabler/icons-react';

interface DetailsModifyDiaperChangeEventProps {
    event: LogEntry & { entryType: EntryType.DiaperChange };
}

export const DetailsModifyDiaperChangeEvent = (
    props: DetailsModifyDiaperChangeEventProps
) => {
    const { event } = props;

    return (
        <>
            {(event.params.reason === 'STOOL' ||
                event.params.reason === 'STOOL_AND_URINE') && (
                <Group>
                    <IconPoo size={16} stroke={1.5} />
                    <Text>Stool</Text>
                </Group>
            )}
            {(event.params.reason === 'URINE' ||
                event.params.reason === 'STOOL_AND_URINE') && (
                <Group>
                    <IconDroplets size={16} stroke={1.5} />
                    <Text>Urine</Text>
                </Group>
            )}
            {event.params.reason === 'OTHER' && (
                <Group>
                    <IconQuestionMark size={16} stroke={1.5} />
                    <Text>Other</Text>
                </Group>
            )}
        </>
    );
};
