import { Badge, Group, Text } from '@mantine/core';
import { LogEntry } from '../../../../common/store/store.types';
import dayjs from 'dayjs';
import {
    IconCalendar,
    IconCalendarX,
    IconHourglassEmpty,
} from '@tabler/icons-react';
import { Duration, DurationFromNow } from './DurationFromNow';
import { ObjectWithProps } from '../../../../common/utils/genericTypes';

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

interface DetailsTimedEventProps {
    event: LogEntry & { entryType: TimedLogEntryTypes };
}

export const DetailsTimedEvent = (props: DetailsTimedEventProps) => {
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

    const finalDuration = endedAtDate.isValid()
        ? dayjs.duration(endedAtDate.diff(startedAtDate))
        : undefined;

    return (
        <>
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
            {!endedAtDate.isValid() && (
                <Group>
                    <IconCalendarX size={16} stroke={1.5} />
                    <Text>
                        Duration: <DurationFromNow startedAt={startedAtDate} />
                    </Text>
                </Group>
            )}
            {finalDuration && (
                <Group>
                    <IconHourglassEmpty size={16} stroke={1.5} />
                    <Text>
                        Duration: <Duration duration={finalDuration} />
                    </Text>
                </Group>
            )}
        </>
    );
};
