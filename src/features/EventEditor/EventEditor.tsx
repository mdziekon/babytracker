import { useParams } from 'react-router';
import { AddDiaperChangeEvent } from './AddDiaperChangeEvent/AddDiaperChangeEvent';
import { useAppStore } from '../../common/store/store';
import { EntryType } from '../../common/store/store.types';
import { AddBareTimedEvent } from './AddBareTimedEvent/AddBareTimedEvent';
import { AddBreastFeedingEvent } from './AddBreastFeedingEvent/AddBreastFeedingEvent';
import { FinishTimedEvent } from './FinishTimedEvent/FinishTimedEvent';
import { CompleteEvent } from './CompleteEvent/CompleteEvent';
import { AddBathEvent } from './AddBathEvent/AddBathEvent';
import { AddWeightMeasurementEvent } from './AddWeightMeasurementEvent/AddWeightMeasurementEvent';
import { AddBottleFeedingEvent } from './AddBottleFeedingEvent/AddBottleFeedingEvent';
import { FinishBottleFeedingEvent } from './FinishBottleFeedingEvent/FinishBottleFeedingEvent';
import { FinishBreastFeedingEvent } from './FinishBreastFeedingEvent/FinishBreastFeedingEvent';

interface EventEditorProps {
    mode: 'add' | 'edit';
}

export const EventEditor = (props: EventEditorProps) => {
    const { mode } = props;
    const { eventType, eventUid } = useParams<{
        eventType?: string;
        eventUid?: string;
    }>();

    const event = useAppStore((store) => {
        return eventUid
            ? store.data.logs.find(
                  (logEntry) => logEntry.metadata.uid === eventUid
              )
            : undefined;
    });

    if (mode === 'add') {
        if (!eventType) {
            throw new Error('Missing event type');
        }

        if (eventType === 'Bath') {
            return <AddBathEvent />;
        }
        if (eventType === 'DiaperChange') {
            return <AddDiaperChangeEvent />;
        }
        if (eventType === 'Sleep') {
            return <AddBareTimedEvent eventType={EntryType.Sleep} />;
        }
        if (eventType === 'BellyPosition') {
            return <AddBareTimedEvent eventType={EntryType.BellyPosition} />;
        }
        if (eventType === 'Walk') {
            return <AddBareTimedEvent eventType={EntryType.Walk} />;
        }
        if (eventType === 'BreastFeeding') {
            return <AddBreastFeedingEvent />;
        }
        if (eventType === 'WeightMeasurement') {
            return <AddWeightMeasurementEvent />;
        }
        if (eventType === 'BottleFeeding') {
            return <AddBottleFeedingEvent />;
        }
    }
    if (mode === 'edit') {
        if (!event) {
            throw new Error('Missing event uid');
        }

        if (
            (event.entryType === EntryType.Sleep ||
                event.entryType === EntryType.BellyPosition ||
                event.entryType === EntryType.Walk) &&
            !event.params.endedAt
        ) {
            return <FinishTimedEvent event={event} />;
        }

        if (
            event.entryType === EntryType.BreastFeeding &&
            !event.params.endedAt
        ) {
            return <FinishBreastFeedingEvent event={event} />;
        }

        if (
            event.entryType === EntryType.BottleFeeding &&
            !event.params.endedAt
        ) {
            return <FinishBottleFeedingEvent event={event} />;
        }

        return <CompleteEvent event={event} />;
    }

    throw new Error('Unknown event type');
};
