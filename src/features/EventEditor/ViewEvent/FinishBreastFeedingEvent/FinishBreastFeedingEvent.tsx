import { Badge } from '@mantine/core';
import { useNavigate } from 'react-router';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { ResponsiveStack } from '../../../../common/design/ResponsiveStack';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { EventCard } from '../../common/EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';
import { v4 as uuidv4 } from 'uuid';

import classes from './FinishBreastFeedingEvent.module.css';
import { routes } from '../../../../common/routes';

const eventType = EntryType.BreastFeeding;

interface FinishBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
}

export const FinishBreastFeedingEvent = (
    props: FinishBreastFeedingEventProps
) => {
    const { event } = props;

    const navigate = useNavigate();
    const addEntry = useAppStore((store) => store.api.addEntry);
    const editEntry = useAppStore((store) => store.api.editEntry);

    const handleFinishEventCounter = () => {
        const newEvent = structuredClone(event);

        newEvent.params.endedAt = new Date().toISOString();

        editEntry(event.metadata.uid, newEvent);
    };
    const handleSwitchBreast = () => {
        const newEventUid = uuidv4();
        const startedAt = new Date().toISOString();

        handleFinishEventCounter();

        addEntry({
            entryType: eventType,
            metadata: {
                uid: newEventUid,
                createdAt: startedAt,
                modifications: [],
            },
            params: {
                startedAt: startedAt,
                type:
                    event.params.type === 'LEFT_BREAST'
                        ? 'RIGHT_BREAST'
                        : 'LEFT_BREAST',
            },
        });

        void navigate(routes.eventView(newEventUid), {
            replace: true,
        });
    };

    return (
        <EventCard
            eventType={event.entryType}
            eventIconBadges={{
                ...(event.params.type === 'LEFT_BREAST'
                    ? {
                          'bottom-left': (
                              <Badge
                                  color="orange"
                                  className={classes.inProgressDuration}
                              >
                                  <span>Left</span>
                              </Badge>
                          ),
                      }
                    : {}),
                ...(event.params.type === 'RIGHT_BREAST'
                    ? {
                          'bottom-right': (
                              <Badge
                                  color="orange"
                                  className={classes.inProgressDuration}
                              >
                                  <span>Right</span>
                              </Badge>
                          ),
                      }
                    : {}),
            }}
            middle={<EventDetails event={event} />}
            footer={
                <ResponsiveStack>
                    {event.params.type !== 'UNSPECIFIED' && (
                        <ResponsiveButton
                            variant="light"
                            color="primary"
                            fullWidth
                            onClick={handleSwitchBreast}
                        >
                            Breast switch
                        </ResponsiveButton>
                    )}
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
