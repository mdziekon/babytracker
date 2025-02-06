import {
    EntryType,
    LogEntry,
} from '../../../common/store/types/storeData.types';
import { CompleteEvent } from './CompleteEvent/CompleteEvent';
import { FinishBreastFeedingEvent } from './FinishBreastFeedingEvent/FinishBreastFeedingEvent';
import { FinishFluidTimedEvent } from './FinishFluidTimedEvent/FinishFluidTimedEvent';
import { FinishTimedEvent } from './FinishTimedEvent/FinishTimedEvent';

interface ViewEventProps {
    event: LogEntry;
}

export const ViewEvent = (props: ViewEventProps) => {
    const { event } = props;

    if (
        (event.entryType === EntryType.Sleep ||
            event.entryType === EntryType.BellyPosition ||
            event.entryType === EntryType.Walk) &&
        !event.params.endedAt
    ) {
        return <FinishTimedEvent event={event} />;
    }

    if (event.entryType === EntryType.BreastFeeding && !event.params.endedAt) {
        return <FinishBreastFeedingEvent event={event} />;
    }

    if (
        (event.entryType === EntryType.BottleFeeding ||
            event.entryType === EntryType.MilkPumping) &&
        !event.params.endedAt
    ) {
        return <FinishFluidTimedEvent event={event} />;
    }

    return <CompleteEvent event={event} />;
};
