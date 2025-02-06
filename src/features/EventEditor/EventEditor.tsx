import { useParams } from 'react-router';
import { useAppStore } from '../../common/store/store';
import { EntryType } from '../../common/store/types/storeData.types';
import { ModifyEvent } from './ModifyEvent/ModifyEvent';
import { AddEvent } from './AddEvent/AddEvent';
import { ViewEvent } from './ViewEvent/ViewEvent';

interface EventEditorProps {
    mode: 'add' | 'view' | 'edit';
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
    if (mode === 'view') {
        if (!event) {
            throw new Error('Missing event uid');
        }

        return <ViewEvent event={event} />;
    }
    // TODO: refactor & remove ignore
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (mode === 'edit') {
        if (!event) {
            throw new Error('Missing event uid');
        }

        return <ModifyEvent event={event} />;
    }

    throw new Error('Unknown event type');
};
