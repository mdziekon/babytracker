import { Badge, Group, Text } from '@mantine/core';
import { LogEntry } from '../../../../../common/store/types/storeData.types';
import dayjs from 'dayjs';
import {
    IconCalendar,
    IconCalendarX,
    IconHourglassEmpty,
} from '@tabler/icons-react';
import { TimedLogEntryTypes } from '../../../../../common/store/store.helperTypes';

import classes from './DetailsTimedEvent.module.css';
import { DurationFromNow } from '../../../../../common/features/Duration/DurationFromNow';
import { Duration } from '../../../../../common/features/Duration/Duration';
import {
    DEFAULT_DATETIME_FORMAT,
    formatDateToRelativeLabel,
} from '../../../../../common/utils/formatting';

interface DetailsTimedEventProps {
    event: LogEntry & { entryType: TimedLogEntryTypes };
}

export const DetailsTimedEvent = (props: DetailsTimedEventProps) => {
    const { event } = props;

    const startedAtDate = dayjs(event.params.startedAt);
    const startedAtBadgeLabel = formatDateToRelativeLabel(startedAtDate);
    const startedAtBadge = startedAtBadgeLabel && (
        <Badge color="gray.7">{startedAtBadgeLabel}</Badge>
    );

    const endedAtDate = dayjs(event.params.endedAt ?? NaN);
    const endedAtBadgeLabel = (() => {
        if (!endedAtDate.isValid()) {
            return;
        }

        return formatDateToRelativeLabel(endedAtDate);
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
                    Started: {startedAtDate.format(DEFAULT_DATETIME_FORMAT)}{' '}
                </Text>
                {startedAtBadge}
            </Group>
            {endedAtDate.isValid() && (
                <Group>
                    <IconCalendarX size={16} stroke={1.5} />
                    <Text>
                        Finished: {endedAtDate.format(DEFAULT_DATETIME_FORMAT)}{' '}
                    </Text>
                    {endedAtBadge}
                </Group>
            )}
            {!endedAtDate.isValid() && (
                <Group>
                    <IconHourglassEmpty
                        size={16}
                        stroke={1.5}
                        className={classes.inProgressDuration}
                    />
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
