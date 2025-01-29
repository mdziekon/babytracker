import { useAppStore } from '../../../../common/store/store';
import { EntryType } from '../../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { Box } from '@mantine/core';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';

interface AddFluidTimedEventProps {
    eventType: EntryType.BottleFeeding | EntryType.MilkPumping;
}

export const AddFluidTimedEvent = (props: AddFluidTimedEventProps) => {
    const { eventType } = props;

    const navigate = useNavigate();
    const addEntry = useAppStore((store) => store.api.addEntry);

    const handleAddEvent = () => {
        const newEntry = addEntry(
            createNewEvent(({ metadata }) => {
                return {
                    entryType: eventType,
                    params: {
                        startedAt: metadata.createdAt,
                    },
                };
            })
        );

        void navigate(routes.eventView(newEntry.metadata.uid));
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

    return (
        <>
            <EventCard eventType={eventType} footer={actions} />
            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </>
    );
};
