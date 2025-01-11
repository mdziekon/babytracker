import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';

interface CompleteEventProps {
    event: LogEntry;
}

export const CompleteEvent = (props: CompleteEventProps) => {
    const { event } = props;

    return (
        <EventCard
            eventType={event.entryType}
            middle={<div>TODO: RENDER DETAILS HERE</div>}
        />
    );
};
