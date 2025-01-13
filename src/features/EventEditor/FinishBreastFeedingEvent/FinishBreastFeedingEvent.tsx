import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { EntryType, LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';

const eventType = EntryType.BreastFeeding;

interface FinishBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
}

export const FinishBreastFeedingEvent = (
    props: FinishBreastFeedingEventProps
) => {
    const { event } = props;

    const navigate = useNavigate();
    const addEntry = useAppStore((store) => store.api.addEntry);
    const editEntry = useAppStore((store) => store.api.editEntry);

    const handleFinishEventCounter = () => {
        const newEvent = structuredClone(event);

        newEvent.params.endedAt = new Date().toISOString();

        editEntry(event.metadata.uid, newEvent);
    };
    const handleSwitchBreast = () => {
        const newEventUid = uuidv4();
        const startedAt = new Date().toISOString();

        handleFinishEventCounter();

        addEntry({
            entryType: eventType,
            metadata: {
                uid: newEventUid,
                createdAt: startedAt,
                modifications: [],
            },
            params: {
                startedAt: startedAt,
                type:
                    event.params.type === 'LEFT_BREAST'
                        ? 'RIGHT_BREAST'
                        : 'LEFT_BREAST',
            },
        });

        void navigate(`/event/edit/${newEventUid}`);
    };

    return (
        <EventCard
            eventType={event.entryType}
            middle={<EventDetails event={event} />}
            footer={
                <>
                    {event.params.type !== 'UNSPECIFIED' && (
                        <Button
                            variant="light"
                            color="primary"
                            fullWidth
                            mb="xs"
                            onClick={handleSwitchBreast}
                        >
                            Breast switch
                        </Button>
                    )}
                    <Button
                        variant="filled"
                        color="pink"
                        fullWidth
                        onClick={handleFinishEventCounter}
                    >
                        Stop counter
                    </Button>
                </>
            }
        />
    );
};
