import { EntryType, LogEntry } from '../../../common/store/store.types';
import { DetailsModifyBreastFeedingEvent } from './DetailsModifyBreastFeedingEvent/DetailsModifyBreastFeedingEvent';
import { DetailsModifyTimedEvent } from './DetailsModifyTimedEvent/DetailsModifyTimedEvent';
import { DetailsModifyDiaperChangeEvent } from './DetailsModifyDiaperChangeEvent/DetailsModifyDiaperChangeEvent';
import { DetailsModifyWeightMeasurementEvent } from './DetailsModifyWeightMeasurementEvent/DetailsModifyWeightMeasurementEvent';
import { DetailsModifyBottleFeedingEvent } from './DetailsModifyBottleFeedingEvent/DetailsModifyBottleFeedingEvent';
import { DetailsModifyCreatedEvent } from './DetailsModifyCreatedEvent/DetailsModifyCreatedEvent';

import { RegisterEventModifier } from '../ModifyEvent/ModifyEvent.types';
import { DetailsList } from '../DetailsList/DetailsList';

interface EventDetailsModifierProps {
    event: LogEntry;
    registerEventModifier: RegisterEventModifier;
}

export const EventDetailsModifier = (props: EventDetailsModifierProps) => {
    const { event, registerEventModifier } = props;

    const details: React.ReactNode[] = [];

    if (
        event.entryType === EntryType.Sleep ||
        event.entryType === EntryType.BellyPosition ||
        event.entryType === EntryType.Walk ||
        event.entryType === EntryType.BreastFeeding ||
        event.entryType === EntryType.BottleFeeding
    ) {
        details.push(
            <DetailsModifyTimedEvent
                registerEventModifier={registerEventModifier}
                event={event}
            />
        );
    } else {
        details.push(<DetailsModifyCreatedEvent event={event} />);
    }

    if (event.entryType === EntryType.BreastFeeding) {
        details.push(<DetailsModifyBreastFeedingEvent event={event} />);
    }
    if (event.entryType === EntryType.BottleFeeding) {
        details.push(<DetailsModifyBottleFeedingEvent event={event} />);
    }
    if (event.entryType === EntryType.DiaperChange) {
        details.push(<DetailsModifyDiaperChangeEvent event={event} />);
    }
    if (event.entryType === EntryType.WeightMeasurement) {
        details.push(<DetailsModifyWeightMeasurementEvent event={event} />);
    }

    return <DetailsList details={details} />;
};
