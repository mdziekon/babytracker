import { Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useMemo, useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';
import { BreastSelector, FeedingType } from './BreastSelector';

const eventType = EntryType.BreastFeeding;

export const AddBreastFeedingEvent = () => {
    const navigate = useNavigate();

    const addEntry = useAppStore((store) => store.api.addEntry);

    const latestBreastFeedingEvent = useAppStore((store) => {
        return store.data.logs.find(
            (logEntry) => logEntry.entryType === EntryType.BreastFeeding
        );
    });

    const defaultSideSelection: FeedingType = useMemo(() => {
        return selectNextFeedingSide(latestBreastFeedingEvent);
    }, [latestBreastFeedingEvent]);

    const recommendedSideSelection =
        defaultSideSelection !== 'UNSPECIFIED'
            ? defaultSideSelection
            : undefined;

    const [feedingType, setFeedingType] =
        useState<FeedingType>(defaultSideSelection);

    const handleAddEvent = () => {
        const newEntry = addEntry(
            createNewEvent(({ metadata }) => {
                return {
                    entryType: eventType,
                    params: {
                        startedAt: metadata.createdAt,
                        type: feedingType,
                    },
                };
            })
        );

        void navigate(routes.eventView(newEntry.metadata.uid), {
            replace: true,
        });
    };

    const middle = (
        <>
            <BreastSelector
                defaultOption={defaultSideSelection}
                recommendedOption={recommendedSideSelection}
                onOptionChange={setFeedingType}
            />
        </>
    );
    const actions = (
        <>
            <ResponsiveButton
                variant="filled"
                fullWidth
                onClick={handleAddEvent}
            >
                Start event
            </ResponsiveButton>
        </>
    );

    return (
        <>
            <EventCard eventType={eventType} middle={middle} footer={actions} />
            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </>
    );
};

const selectNextFeedingSide = (
    event?: LogEntry & { entryType: EntryType.BreastFeeding }
) => {
    if (!event) {
        return 'UNSPECIFIED';
    }

    const latestSideSelection = event.params.type;

    if (latestSideSelection === 'UNSPECIFIED') {
        return 'UNSPECIFIED';
    }

    return latestSideSelection === 'LEFT_BREAST'
        ? 'RIGHT_BREAST'
        : 'LEFT_BREAST';
};
