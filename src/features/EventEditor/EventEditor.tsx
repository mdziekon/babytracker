import { useParams } from 'react-router';
import { AddDiaperChangeEvent } from './AddDiaperChangeEvent/AddDiaperChangeEvent';
import { useAppStore } from '../../common/store/store';
import { EntryType } from '../../common/store/store.types';
import { AddBareTimedEvent } from './AddBareTimedEvent/AddBareTimedEvent';
import { AddBreastFeedingEvent } from './AddBreastFeedingEvent/AddBreastFeedingEvent';
import { FinishTimedEvent } from './FinishTimedEvent/FinishTimedEvent';
import { CompleteEvent } from './CompleteEvent/CompleteEvent';

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
    }
    if (mode === 'edit') {
        if (!event) {
            throw new Error('Missing event uid');
        }

        if (
            event.entryType === EntryType.Sleep ||
            event.entryType === EntryType.BellyPosition ||
            event.entryType === EntryType.BottleFeeding ||
            event.entryType === EntryType.Walk ||
            event.entryType === EntryType.BreastFeeding
        ) {
            if (!event.params.endedAt) {
                return <FinishTimedEvent event={event} />;
            }

            return <CompleteEvent event={event} />;
        }
    }

    throw new Error('Unknown event type');
};
