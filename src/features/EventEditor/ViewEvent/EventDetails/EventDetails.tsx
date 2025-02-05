import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { DetailsBreastFeedingEvent } from './DetailsBreastFeedingEvent/DetailsBreastFeedingEvent';
import { DetailsTimedEvent } from './DetailsTimedEvent/DetailsTimedEvent';
import { DetailsDiaperChangeEvent } from './DetailsDiaperChangeEvent/DetailsDiaperChangeEvent';
import { DetailsMedicineEvent } from './DetailsMedicineEvent/DetailsMedicineEvent';
import { DetailsFluidTimedEvent } from './DetailsFluidTimedEvent/DetailsFluidTimedEvent';
import { DetailsCreatedEvent } from './DetailsCreatedEvent/DetailsCreatedEvent';
import { DetailsList } from '../../common/DetailsList/DetailsList';
import { isTimedEntry } from '../../../../common/utils/entryGuards';
import { DetailsWeightMeasurementEvent } from './DetailsWeightMeasurementEvent/DetailsWeightMeasurementEvent';

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
    if (
        event.entryType === EntryType.BottleFeeding ||
        event.entryType === EntryType.MilkPumping
    ) {
        details.push(<DetailsFluidTimedEvent event={event} />);
    }
    if (event.entryType === EntryType.DiaperChange) {
        details.push(<DetailsDiaperChangeEvent event={event} />);
    }
    if (event.entryType === EntryType.WeightMeasurement) {
        details.push(<DetailsWeightMeasurementEvent event={event} />);
    }
    if (event.entryType === EntryType.Medicine) {
        details.push(<DetailsMedicineEvent event={event} />);
    }

    return <DetailsList details={details} />;
};
