import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';
import { ObjectWithProps } from '../../../common/utils/genericTypes';

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
            middle={<EventDetails event={event} />}
            footer={
                <>
                    <Button
                        variant="filled"
                        color="pink"
                        fullWidth
                        onClick={handleFinishEventCounter}
                    >
                        Stop counter
                    </Button>
                </>
            }
        />
    );
};
