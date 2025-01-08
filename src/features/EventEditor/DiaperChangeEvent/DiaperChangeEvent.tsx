import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { EntryType } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { EventCard } from '../EventCard/EventCard';

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
        <EventCard eventType={EntryType.DiaperChange}>
            <Button
                variant="primary"
                fullWidth
                mt="md"
                onClick={handleAddEvent}
            >
                Add event
            </Button>
        </EventCard>
    );
};
