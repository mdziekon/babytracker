import { EntryType, LogEntry } from '../../../common/store/store.types';
import { DetailsModifyBreastFeedingEvent } from './DetailsModifyBreastFeedingEvent/DetailsModifyBreastFeedingEvent';
import { DetailsModifyTimedEvent } from './DetailsModifyTimedEvent/DetailsModifyTimedEvent';
import { DetailsModifyDiaperChangeEvent } from './DetailsModifyDiaperChangeEvent/DetailsModifyDiaperChangeEvent';
import { DetailsModifyWeightMeasurementEvent } from './DetailsModifyWeightMeasurementEvent/DetailsModifyWeightMeasurementEvent';
import { DetailsModifyFluidTimedEvent } from './DetailsModifyFluidTimedEvent/DetailsModifyFluidTimedEvent';
import { DetailsModifyCreatedEvent } from './DetailsModifyCreatedEvent/DetailsModifyCreatedEvent';

import { RegisterEventModifier } from '../ModifyEvent/ModifyEvent.types';
import { DetailsList } from '../DetailsList/DetailsList';
import { isTimedEntry } from '../../../common/utils/entryGuards';

interface EventDetailsModifierProps {
    event: LogEntry;
    registerEventModifier: RegisterEventModifier;
}

export const EventDetailsModifier = (props: EventDetailsModifierProps) => {
    const { event, registerEventModifier } = props;

    const details: React.ReactNode[] = [];

    if (isTimedEntry(event)) {
        details.push(
            <DetailsModifyTimedEvent
                event={event}
                registerEventModifier={registerEventModifier}
            />
        );
    } else {
        details.push(
            <DetailsModifyCreatedEvent
                event={event}
                registerEventModifier={registerEventModifier}
            />
        );
    }

    if (event.entryType === EntryType.BreastFeeding) {
        details.push(
            <DetailsModifyBreastFeedingEvent
                event={event}
                registerEventModifier={registerEventModifier}
            />
        );
    }
    if (
        event.entryType === EntryType.BottleFeeding ||
        event.entryType === EntryType.MilkPumping
    ) {
        details.push(
            <DetailsModifyFluidTimedEvent
                event={event}
                registerEventModifier={registerEventModifier}
            />
        );
    }
    if (event.entryType === EntryType.DiaperChange) {
        details.push(
            <DetailsModifyDiaperChangeEvent
                event={event}
                registerEventModifier={registerEventModifier}
            />
        );
    }
    if (event.entryType === EntryType.WeightMeasurement) {
        details.push(
            <DetailsModifyWeightMeasurementEvent
                event={event}
                registerEventModifier={registerEventModifier}
            />
        );
    }

    return <DetailsList details={details} />;
};
