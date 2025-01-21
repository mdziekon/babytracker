import { EntryType, LogEntry } from '../../../common/store/store.types';
import { DetailsBreastFeedingEvent } from './DetailsBreastFeedingEvent/DetailsBreastFeedingEvent';
import { DetailsTimedEvent } from './DetailsTimedEvent/DetailsTimedEvent';
import { DetailsDiaperChangeEvent } from './DetailsDiaperChangeEvent/DetailsDiaperChangeEvent';
import { DetailsWeightMeasurementEvent } from './DetailsWeightMeasurementEvent/DetailsWeightMeasurementEvent';
import { DetailsBottleFeedingEvent } from './DetailsBottleFeedingEvent/DetailsBottleFeedingEvent';
import { DetailsCreatedEvent } from './DetailsCreatedEvent/DetailsCreatedEvent';

import { DetailsList } from '../DetailsList/DetailsList';

interface EventDetailsProps {
    event: LogEntry;
}

export const EventDetails = (props: EventDetailsProps) => {
    const { event } = props;

    const details: React.ReactNode[] = [];

    if (
        event.entryType === EntryType.Sleep ||
        event.entryType === EntryType.BellyPosition ||
        event.entryType === EntryType.Walk ||
        event.entryType === EntryType.BreastFeeding ||
        event.entryType === EntryType.BottleFeeding
    ) {
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
