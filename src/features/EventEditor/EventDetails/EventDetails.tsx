import { EntryType, LogEntry } from '../../../common/store/store.types';
import { DetailsBreastFeedingEvent } from './DetailsBreastFeedingEvent/DetailsBreastFeedingEvent';

interface EventDetailsProps {
    event: LogEntry;
}

export const EventDetails = (props: EventDetailsProps) => {
    const { event } = props;

    if (event.entryType === EntryType.BreastFeeding) {
        return <DetailsBreastFeedingEvent event={event} />;
    }

    throw new Error('Unsupported entry type');
};
