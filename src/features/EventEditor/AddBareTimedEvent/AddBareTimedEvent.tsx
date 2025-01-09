import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { LogEntry } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { EventCard } from '../EventCard/EventCard';

type ObjectWithExactlyProps<T, Props> = T extends Props
    ? Exclude<keyof T, keyof Props> extends never
        ? T
        : never
    : never;

type WithTimedLogParams<T> = T extends {
    params: ObjectWithExactlyProps<
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        infer _U,
        { startedAt: string; endedAt?: string }
    >;
}
    ? T
    : never;
type BareTimedLogEntries = WithTimedLogParams<LogEntry>;
type BareTimedLogEntryTypes = BareTimedLogEntries['entryType'];

interface AddBareTimedEventProps {
    eventType: BareTimedLogEntryTypes;
}

export const AddBareTimedEvent = (props: AddBareTimedEventProps) => {
    const { eventType } = props;

    const navigate = useNavigate();

    const addEntry = useAppStore((store) => store.api.addEntry);

    const handleAddEvent = () => {
        const newEventUid = uuidv4();
        const startedAt = new Date().toISOString();

        addEntry({
            entryType: eventType,
            metadata: {
                uid: newEventUid,
                createdAt: startedAt,
                modifications: [],
            },
            params: {
                startedAt: startedAt,
            },
        });

        void navigate(`/event/edit/${newEventUid}`);
    };

    const actions = (
        <>
            <Button variant="filled" fullWidth onClick={handleAddEvent}>
                Start event
            </Button>
        </>
    );

    return <EventCard eventType={eventType} footer={actions} />;
};
