import { Avatar, Button, Paper, Text } from '@mantine/core';
import { IconDiaper } from '@tabler/icons-react';
import { useAppStore } from '../../../common/store/store';
import { EntryType } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

export const DiaperChangeEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const handleAddEvent = () => {
        addEntry({
            entryType: EntryType.DiaperChange,
            metadata: {
                uid: uuidv4(),
                createdAt: new Date().toISOString(),
                modifications: [],
            },
            params: {
                reason: 'OTHER',
            },
        });

        void navigate('/');
    };

    return (
        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar size={120} radius={120} mx="auto">
                <IconDiaper style={{ width: '70%', height: '70%' }} />
            </Avatar>
            <Text ta="center" fz="lg" fw={500} mt="md">
                Diaper change
            </Text>

            <Button
                variant="primary"
                fullWidth
                mt="md"
                onClick={handleAddEvent}
            >
                Add event
            </Button>
        </Paper>
    );
};
