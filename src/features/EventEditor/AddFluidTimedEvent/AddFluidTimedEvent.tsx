import { useAppStore } from '../../../common/store/store';
import { EntryType } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { EventCard } from '../EventCard/EventCard';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';

interface AddFluidTimedEventProps {
    eventType: EntryType.BottleFeeding | EntryType.MilkPumping;
}

export const AddFluidTimedEvent = (props: AddFluidTimedEventProps) => {
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
            <ResponsiveButton
                variant="filled"
                fullWidth
                onClick={handleAddEvent}
            >
                Start event
            </ResponsiveButton>
        </>
    );

    return <EventCard eventType={eventType} footer={actions} />;
};
