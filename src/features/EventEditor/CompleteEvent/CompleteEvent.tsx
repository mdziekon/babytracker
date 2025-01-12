import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';

interface CompleteEventProps {
    event: LogEntry;
}

export const CompleteEvent = (props: CompleteEventProps) => {
    const { event } = props;

    return (
        <EventCard
            eventType={event.entryType}
            middle={<EventDetails event={event} />}
        />
    );
};
