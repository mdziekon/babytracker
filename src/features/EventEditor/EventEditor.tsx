import { useParams } from 'react-router';
import { DiaperChangeEvent } from './DiaperChangeEvent/DiaperChangeEvent';
import { SleepEvent } from './SleepEvent/SleepEvent';
import { useAppStore } from '../../common/store/store';
import { EntryType } from '../../common/store/store.types';

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
            return <DiaperChangeEvent />;
        }
        if (eventType === 'Sleep') {
            return <SleepEvent />;
        }
    }
    if (mode === 'edit') {
        if (!event) {
            throw new Error('Missing event uid');
        }

        if (event.entryType === EntryType.Sleep) {
            return <SleepEvent eventUid={eventUid} />;
        }
    }

    throw new Error('Unknown event type');
};
