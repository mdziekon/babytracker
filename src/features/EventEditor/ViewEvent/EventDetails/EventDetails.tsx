import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { DetailsBreastFeedingEvent } from './DetailsBreastFeedingEvent/DetailsBreastFeedingEvent';
import { DetailsTimedEvent } from './DetailsTimedEvent/DetailsTimedEvent';
import { DetailsDiaperChangeEvent } from './DetailsDiaperChangeEvent/DetailsDiaperChangeEvent';
import { DetailsMedicineEvent } from './DetailsMedicineEvent/DetailsMedicineEvent';
import { DetailsFluidTimedEvent } from './DetailsFluidTimedEvent/DetailsFluidTimedEvent';
import { DetailsCreatedEvent } from './DetailsCreatedEvent/DetailsCreatedEvent';
import { DetailsList } from '../../common/DetailsList/DetailsList';
import { isTimedEntry } from '../../../../common/utils/entryGuards';
import { DetailsWeightMeasurementEvent } from './DetailsWeightMeasurementEvent/DetailsWeightMeasurementEvent';
import { DetailsOtherEvent } from './DetailsOtherEvent/DetailsOtherEvent';
import { DetailsDoctorsAppointmentEvent } from './DetailsDoctorsAppointmentEvent/DetailsDoctorsAppointmentEvent';

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
    if (event.entryType === EntryType.DoctorsAppointment) {
        details.push(<DetailsDoctorsAppointmentEvent event={event} />);
    }
    if (event.entryType === EntryType.Other) {
        details.push(<DetailsOtherEvent event={event} />);
    }

    return <DetailsList details={details} />;
};
