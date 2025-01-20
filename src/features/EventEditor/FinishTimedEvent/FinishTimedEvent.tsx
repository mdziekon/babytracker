import { useAppStore } from '../../../common/store/store';
import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';
import { TimedLogEntryTypes } from '../../../common/store/store.helperTypes';
import { ResponsiveStack } from '../../../common/design/ResponsiveStack';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';

interface FinishTimedEventProps {
    event: LogEntry & { entryType: TimedLogEntryTypes };
}

export const FinishTimedEvent = (props: FinishTimedEventProps) => {
    const { event } = props;
    const editEntry = useAppStore((store) => store.api.editEntry);

    const handleFinishEventCounter = () => {
        const newEvent = structuredClone(event);

        newEvent.params.endedAt = new Date().toISOString();

        editEntry(event.metadata.uid, newEvent);
    };

    return (
        <EventCard
            eventType={event.entryType}
            middle={<EventDetails event={event} />}
            footer={
                <ResponsiveStack>
                    <ResponsiveButton
                        variant="filled"
                        color="pink"
                        fullWidth
                        onClick={handleFinishEventCounter}
                    >
                        Stop counter
                    </ResponsiveButton>
                </ResponsiveStack>
            }
        />
    );
};
