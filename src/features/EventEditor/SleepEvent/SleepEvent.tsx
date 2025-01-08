import { Avatar, Button, Paper, Text } from '@mantine/core';
import { IconMoonStars } from '@tabler/icons-react';
import { useAppStore } from '../../../common/store/store';
import { EntryType, LogEntry } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

interface SleepEventProps {
    eventUid?: string;
}

export const SleepEvent = (props: SleepEventProps) => {
    const { eventUid } = props;
    const event = useAppStore((store) => {
        return eventUid
            ? store.data.logs.find(
                  (logEntry) => logEntry.metadata.uid === eventUid
              )
            : undefined;
    });
    const addEntry = useAppStore((store) => store.api.addEntry);
    const editEntry = useAppStore((store) => store.api.editEntry);
    const navigate = useNavigate();

    if (event && event.entryType !== EntryType.Sleep) {
        throw new Error('Invalid entryType');
    }

    const handleAddEvent = () => {
        const newEventUid = uuidv4();
        const startedAt = new Date().toISOString();

        addEntry({
            entryType: EntryType.Sleep,
            metadata: {
                uid: newEventUid,
                createdAt: startedAt,
                modifications: [],
            },
            params: {
                startedAt: startedAt,
            },
        });

        void navigate(`/event/edit/${newEventUid}`);
    };
    const handleStopEventCounter = () => {
        if (!event) {
            return;
        }

        editEntry(eventUid ?? '', {
            ...event,
            params: {
                ...event.params,
                endedAt: new Date().toISOString(),
            },
        } satisfies LogEntry & { entryType: EntryType.Sleep });
    };

    const actions = (() => {
        if (!event) {
            return (
                <>
                    <Button
                        variant="filled"
                        fullWidth
                        mt="md"
                        onClick={handleAddEvent}
                    >
                        Start counter
                    </Button>
                </>
            );
        }

        if (!event.params.endedAt) {
            return (
                <>
                    <Button variant="outline" disabled fullWidth mt="md">
                        Started: xxx ago
                    </Button>
                    <Button
                        variant="filled"
                        color="pink"
                        fullWidth
                        mt="md"
                        onClick={handleStopEventCounter}
                    >
                        Stop counter
                    </Button>
                </>
            );
        }

        return (
            <>
                <Button variant="outline" disabled fullWidth mt="md">
                    Started: xxx ago
                </Button>
                <Button variant="outline" disabled fullWidth mt="md">
                    Duration: xxx hours
                </Button>
            </>
        );
    })();

    return (
        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar size={120} radius={120} mx="auto">
                <IconMoonStars style={{ width: '70%', height: '70%' }} />
            </Avatar>
            <Text ta="center" fz="lg" fw={500} mt="md">
                Sleep
            </Text>

            {actions}
        </Paper>
    );
};
