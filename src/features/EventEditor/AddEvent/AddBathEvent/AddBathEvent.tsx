import { useAppStore } from '../../../../common/store/store';
import { EntryType } from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/components/EventCard/EventCard';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { Box } from '@mantine/core';
import { RecentEvents } from '../../common/components/RecentEvents/RecentEvents';

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

        void navigate(routes.eventView(newEntry.metadata.uid), {
            replace: true,
        });
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

    return (
        <>
            <EventCard eventType={eventType} footer={actions} />

            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </>
    );
};
