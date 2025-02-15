import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { ResponsiveStack } from '../../../../common/design/ResponsiveStack';
import { useAppStore } from '../../../../common/store/store';
import { TimedLogEntryTypes } from '../../../../common/store/store.helperTypes';
import { LogEntry } from '../../../../common/store/types/storeData.types';
import { EventCard } from '../../common/components/EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';

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
                <ResponsiveStack>
                    <ResponsiveButton
                        variant="filled"
                        color="pink"
                        fullWidth
                        onClick={handleFinishEventCounter}
                    >
                        Stop counter
                    </ResponsiveButton>
                </ResponsiveStack>
            }
        />
    );
};
