import { EntryType, LogEntry } from '../../../common/store/store.types';
import { DetailsBreastFeedingEvent } from './DetailsBreastFeedingEvent/DetailsBreastFeedingEvent';
import { DetailsTimedEvent } from './DetailsTimedEvent/DetailsTimedEvent';
import { DetailsDiaperChangeEvent } from './DetailsDiaperChangeEvent/DetailsDiaperChangeEvent';
import { DetailsWeightMeasurementEvent } from './DetailsWeightMeasurementEvent/DetailsWeightMeasurementEvent';
import { DetailsBottleFeedingEvent } from './DetailsBottleFeedingEvent/DetailsBottleFeedingEvent';
import { DetailsCreatedEvent } from './DetailsCreatedEvent/DetailsCreatedEvent';

import { DetailsList } from '../DetailsList/DetailsList';
import { isTimedEntry } from '../../../common/utils/entryGuards';

interface EventDetailsProps {
    event: LogEntry;
}

export const EventDetails = (props: EventDetailsProps) => {
    const { event } = props;

    const details: React.ReactNode[] = [];

    if (isTimedEntry(event)) {
        details.push(<DetailsTimedEvent event={event} />);
    } else {
        details.push(<DetailsCreatedEvent event={event} />);
    }

    if (event.entryType === EntryType.BreastFeeding) {
        details.push(<DetailsBreastFeedingEvent event={event} />);
    }
    if (event.entryType === EntryType.BottleFeeding) {
        details.push(<DetailsBottleFeedingEvent event={event} />);
    }
    if (event.entryType === EntryType.DiaperChange) {
        details.push(<DetailsDiaperChangeEvent event={event} />);
    }
    if (event.entryType === EntryType.WeightMeasurement) {
        details.push(<DetailsWeightMeasurementEvent event={event} />);
    }

    return <DetailsList details={details} />;
};
