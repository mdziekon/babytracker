import {
    Badge,
    Box,
    Button,
    Group,
    rem,
    SegmentedControl,
} from '@mantine/core';
import { useAppStore } from '../../../common/store/store';
import { EntryType, LogEntry } from '../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { EventCard } from '../EventCard/EventCard';
import { useMemo, useState } from 'react';
import {
    IconLetterL,
    IconLetterR,
    IconQuestionMark,
} from '@tabler/icons-react';

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
                type: feedingType,
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

    return (
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
    );
};
