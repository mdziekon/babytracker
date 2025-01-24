import { useAppStore } from '../../../common/store/store';
import { EntryType } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../EventCard/EventCard';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../common/store/store.utils';

const eventType = EntryType.Bath;

export const AddBathEvent = () => {
    const navigate = useNavigate();

    const addEntry = useAppStore((store) => store.api.addEntry);

    const handleAddEvent = () => {
        const newEntry = addEntry(
            createNewEvent(() => {
                return {
                    entryType: eventType,
                };
            })
        );

        void navigate(`/event/edit/${newEntry.metadata.uid}`);
    };

    const actions = (
        <>
            <ResponsiveButton
                variant="filled"
                fullWidth
                onClick={handleAddEvent}
            >
                Add event
            </ResponsiveButton>
        </>
    );

    return <EventCard eventType={eventType} footer={actions} />;
};
