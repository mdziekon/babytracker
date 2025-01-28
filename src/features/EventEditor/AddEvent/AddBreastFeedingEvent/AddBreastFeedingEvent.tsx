import { Badge, Box, Group, rem, SegmentedControl } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useMemo, useState } from 'react';
import {
    IconLetterL,
    IconLetterR,
    IconQuestionMark,
} from '@tabler/icons-react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';

const eventType = EntryType.BreastFeeding;
type FeedingType = (LogEntry & {
    entryType: typeof eventType;
})['params']['type'];

export const AddBreastFeedingEvent = () => {
    const navigate = useNavigate();

    const addEntry = useAppStore((store) => store.api.addEntry);

    const latestBreastFeedingEvent = useAppStore((store) => {
        return store.data.logs.find(
            (logEntry) => logEntry.entryType === EntryType.BreastFeeding
        );
    });
    const recommendedSideSelection: FeedingType = useMemo(() => {
        if (!latestBreastFeedingEvent) {
            return 'UNSPECIFIED';
        }

        const latestSideSelection = latestBreastFeedingEvent.params.type;

        if (latestSideSelection === 'UNSPECIFIED') {
            return 'UNSPECIFIED';
        }

        return latestSideSelection === 'LEFT_BREAST'
            ? 'RIGHT_BREAST'
            : 'LEFT_BREAST';
    }, [latestBreastFeedingEvent]);

    const [feedingType, setFeedingType] = useState<FeedingType>(
        recommendedSideSelection
    );

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

        void navigate(routes.eventView(newEntry.metadata.uid));
    };

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
            <EventCard
                eventType={eventType}
                middle={
                    <>
                        <Box>
                            <SegmentedControl
                                fullWidth
                                orientation="vertical"
                                defaultValue={feedingType}
                                onChange={(value) => {
                                    setFeedingType(
                                        value as unknown as typeof feedingType
                                    );
                                }}
                                data={
                                    [
                                        {
                                            value: 'LEFT_BREAST',
                                            label: (
                                                <Group gap="xs">
                                                    <Group
                                                        style={{
                                                            width: rem(24 * 2),
                                                        }}
                                                        justify="flex-end"
                                                    >
                                                        <IconLetterL
                                                            style={{
                                                                width: rem(24),
                                                                height: rem(24),
                                                            }}
                                                        />
                                                    </Group>
                                                    <div>
                                                        Left breast{' '}
                                                        {recommendedSideSelection ===
                                                        'LEFT_BREAST' ? (
                                                            <Badge color="indigo">
                                                                Suggested
                                                            </Badge>
                                                        ) : null}
                                                    </div>
                                                </Group>
                                            ),
                                        },
                                        {
                                            value: 'RIGHT_BREAST',
                                            label: (
                                                <Group gap="xs">
                                                    <Group
                                                        style={{
                                                            width: rem(24 * 2),
                                                        }}
                                                        justify="flex-end"
                                                    >
                                                        <IconLetterR
                                                            style={{
                                                                width: rem(24),
                                                                height: rem(24),
                                                            }}
                                                        />
                                                    </Group>
                                                    <div>
                                                        Right breast{' '}
                                                        {recommendedSideSelection ===
                                                        'RIGHT_BREAST' ? (
                                                            <Badge color="indigo">
                                                                Suggested
                                                            </Badge>
                                                        ) : null}
                                                    </div>
                                                </Group>
                                            ),
                                        },
                                        {
                                            value: 'UNSPECIFIED',
                                            label: (
                                                <Group gap="xs">
                                                    <Group
                                                        style={{
                                                            width: rem(24 * 2),
                                                        }}
                                                        justify="flex-end"
                                                    >
                                                        <IconQuestionMark
                                                            style={{
                                                                width: rem(24),
                                                                height: rem(24),
                                                            }}
                                                        />
                                                    </Group>
                                                    <div>Unspecified</div>
                                                </Group>
                                            ),
                                        },
                                    ] satisfies {
                                        value: typeof feedingType;
                                        label: React.ReactNode;
                                    }[]
                                }
                            />
                        </Box>
                    </>
                }
                footer={actions}
            />
            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </>
    );
};
