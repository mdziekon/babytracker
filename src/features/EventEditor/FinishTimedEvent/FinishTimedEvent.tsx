import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';

type ObjectWithProps<T, Props> = T extends Props ? T : never;

type WithTimedLogParams<T> = T extends {
    params: ObjectWithProps<
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        infer _U,
        { startedAt: string; endedAt?: string }
    >;
}
    ? T
    : never;
type TimedLogEntries = WithTimedLogParams<LogEntry>;
type TimedLogEntryTypes = TimedLogEntries['entryType'];

interface FinishTimedEventProps {
    event: LogEntry & { entryType: TimedLogEntryTypes };
}

export const FinishTimedEvent = (props: FinishTimedEventProps) => {
    const { event } = props;
    const editEntry = useAppStore((store) => store.api.editEntry);

    const handleFinishEventCounter = () => {
        const newEvent = structuredClone(event);

        newEvent.params.endedAt = new Date().toISOString();

        editEntry(event.metadata.uid, newEvent);
    };

    return (
        <EventCard
            eventType={event.entryType}
            middle={<div>TODO: RENDER DETAILS HERE</div>}
            footer={
                <>
                    <Button variant="outline" disabled fullWidth>
                        Started: xxx ago
                    </Button>
                    <Button
                        variant="filled"
                        color="pink"
                        fullWidth
                        mt="md"
                        onClick={handleFinishEventCounter}
                    >
                        Stop counter
                    </Button>
                </>
            }
        />
    );
};
