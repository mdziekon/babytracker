import { Badge, Group, Stack, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import dayjs from 'dayjs';
import {
    IconBrandMcdonalds,
    IconCalendar,
    IconCalendarX,
    IconHourglassEmpty,
} from '@tabler/icons-react';

interface DetailsBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
}

export const DetailsBreastFeedingEvent = (
    props: DetailsBreastFeedingEventProps
) => {
    const { event } = props;

    const startedAtDate = dayjs(event.params.startedAt);
    const startedAtBadgeLabel = (() => {
        if (startedAtDate.isToday()) {
            return 'Today';
        }
        if (startedAtDate.isYesterday()) {
            return 'Yesterday';
        }
    })();
    const startedAtBadge = startedAtBadgeLabel && (
        <Badge color="gray.7">{startedAtBadgeLabel}</Badge>
    );

    const endedAtDate = dayjs(event.params.endedAt ?? NaN);
    const endedAtBadgeLabel = (() => {
        if (!endedAtDate.isValid()) {
            return;
        }
        if (endedAtDate.isToday()) {
            return 'Today';
        }
        if (endedAtDate.isYesterday()) {
            return 'Yesterday';
        }
    })();
    const endedAtBadge = endedAtBadgeLabel && (
        <Badge color="gray.7">{endedAtBadgeLabel}</Badge>
    );

    const duration = endedAtDate.isValid()
        ? dayjs.duration(endedAtDate.diff(startedAtDate))
        : undefined;

    const whichBreast = (() => {
        switch (event.params.type) {
            case 'LEFT_BREAST':
                return 'Left breast';
            case 'RIGHT_BREAST':
                return 'Right breast';
            case 'UNSPECIFIED':
                return 'Unspecified';
        }
    })();

    return (
        <Stack gap="0.125rem">
            <Group>
                <IconCalendar size={16} stroke={1.5} />
                <Text>
                    Started: {startedAtDate.format('YYYY-MM-DD HH:mm')}{' '}
                </Text>
                {startedAtBadge}
            </Group>
            {endedAtDate.isValid() && (
                <Group>
                    <IconCalendarX size={16} stroke={1.5} />
                    <Text>
                        Finished: {endedAtDate.format('YYYY-MM-DD HH:mm')}{' '}
                    </Text>
                    {endedAtBadge}
                </Group>
            )}
            {duration && (
                <Group>
                    <IconHourglassEmpty size={16} stroke={1.5} />
                    <Text>
                        Duration:{' '}
                        {duration.hours() > 0 ? duration.format('HH[:]') : ''}
                        {duration.format('mm:ss')}
                    </Text>
                </Group>
            )}

            <Group>
                <IconBrandMcdonalds size={16} stroke={1.5} />
                <Text>Breast: {whichBreast}</Text>
            </Group>
        </Stack>
    );
};
