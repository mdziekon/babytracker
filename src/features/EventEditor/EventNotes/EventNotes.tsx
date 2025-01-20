import { Group, Stack, Text, Textarea } from '@mantine/core';
import { LogEntry } from '../../../common/store/store.types';
import { useState } from 'react';
import { IconDeviceFloppy, IconNote } from '@tabler/icons-react';
import { useAppStore } from '../../../common/store/store';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';

interface EventNotesProps {
    event: LogEntry;
}

export const EventNotes = (props: EventNotesProps) => {
    const { event } = props;
    const editEntry = useAppStore((store) => store.api.editEntry);

    const [noteValue, setNoteValue] = useState(event.metadata.notes ?? '');

    const handleSaveNotes = () => {
        const newEvent = structuredClone(event);

        newEvent.metadata.notes = noteValue || undefined;

        editEntry(event.metadata.uid, newEvent);
    };

    return (
        <Stack gap="0.125rem">
            <Textarea
                label={
                    <Group gap="0.25rem">
                        <IconNote size={16} stroke={1.5} />
                        Notes
                    </Group>
                }
                placeholder="Some note about this entry..."
                value={noteValue}
                onChange={(event) => {
                    setNoteValue(event.currentTarget.value);
                }}
            />
            <ResponsiveButton
                variant="light"
                color="primary"
                fullWidth
                mt="xs"
                onClick={handleSaveNotes}
            >
                <IconDeviceFloppy />
                <Text component="span" ml="0.25rem">
                    Save notes
                </Text>
            </ResponsiveButton>
        </Stack>
    );
};
