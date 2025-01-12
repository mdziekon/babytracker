import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { EventCard } from '../EventCard/EventCard';
import { BareTimedLogEntryTypes } from '../../../common/store/store.helperTypes';

interface AddBareTimedEventProps {
    eventType: BareTimedLogEntryTypes;
}

export const AddBareTimedEvent = (props: AddBareTimedEventProps) => {
    const { eventType } = props;

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
            params: {
                startedAt: startedAt,
            },
        });

        void navigate(`/event/edit/${newEventUid}`);
    };

    const actions = (
        <>
            <Button variant="filled" fullWidth onClick={handleAddEvent}>
                Start event
            </Button>
        </>
    );

    return <EventCard eventType={eventType} footer={actions} />;
};
