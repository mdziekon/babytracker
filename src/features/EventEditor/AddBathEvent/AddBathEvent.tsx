import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { EntryType } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { EventCard } from '../EventCard/EventCard';

const eventType = EntryType.Bath;

export const AddBathEvent = () => {
    const navigate = useNavigate();

    const addEntry = useAppStore((store) => store.api.addEntry);

    const handleAddEvent = () => {
        const newEventUid = uuidv4();
        const startedAt = new Date().toISOString();

        addEntry({
            entryType: eventType,
            metadata: {
                uid: newEventUid,
                createdAt: startedAt,
                modifications: [],
            },
        });

        void navigate(`/event/edit/${newEventUid}`);
    };

    const actions = (
        <>
            <Button variant="filled" fullWidth onClick={handleAddEvent}>
                Add event
            </Button>
        </>
    );

    return <EventCard eventType={eventType} footer={actions} />;
};
