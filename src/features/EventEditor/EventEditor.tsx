import { useParams } from 'react-router';
import { useAppStore } from '../../common/store/store';
import { EntryType } from '../../common/store/store.types';
import { FinishTimedEvent } from './FinishTimedEvent/FinishTimedEvent';
import { CompleteEvent } from './CompleteEvent/CompleteEvent';
import { FinishFluidTimedEvent } from './FinishFluidTimedEvent/FinishFluidTimedEvent';
import { FinishBreastFeedingEvent } from './FinishBreastFeedingEvent/FinishBreastFeedingEvent';
import { ModifyEvent } from './ModifyEvent/ModifyEvent';
import { AddEvent } from './AddEvent/AddEvent';

interface EventEditorProps {
    mode: 'add' | 'edit' | 'modify';
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

        return (
            <AddEvent
                eventType={
                    Object.values(EntryType).find((type) =>
                        type.includes(eventType)
                    ) ?? 'unknown'
                }
            />
        );
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
            (event.entryType === EntryType.BottleFeeding ||
                event.entryType === EntryType.MilkPumping) &&
            !event.params.endedAt
        ) {
            return <FinishFluidTimedEvent event={event} />;
        }

        return <CompleteEvent event={event} />;
    }
    // TODO: refactor & remove ignore
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (mode === 'modify') {
        if (!event) {
            throw new Error('Missing event uid');
        }

        return <ModifyEvent event={event} />;
    }

    throw new Error('Unknown event type');
};
