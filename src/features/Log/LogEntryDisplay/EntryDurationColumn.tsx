import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import classes from '../Log.module.css';
import { MiniDetailsEntry } from '../LogEntryEventMiniDetails/MiniDetailsEntry/MiniDetailsEntry';
import { Duration } from '../../../common/features/Duration/Duration';
import { TimeAgo } from '../../../common/features/TimeAgo/TimeAgo';
import { IconCalendar, IconClock } from '@tabler/icons-react';

interface EntryDurationColumnProps {
    started: dayjs.Dayjs;
    ended: dayjs.Dayjs | null | undefined;
    now: dayjs.Dayjs;
}

const EntryDurationColumnBase = (props: EntryDurationColumnProps) => {
    const { started, ended, now } = props;

    const entryDuration = useMemo(() => {
        if (!ended) {
            return;
        }

        return dayjs.duration(ended.diff(started));
    }, [ended, started]);
    const entryStartedTimeAgo = useMemo(() => {
        const startedTimeAgo = dayjs.duration(now.diff(started));

        if (startedTimeAgo.asHours() > 24) {
            return;
        }

        return startedTimeAgo;
    }, [now, started]);

    return (
        <div>
            {entryDuration ? (
                <div className={classes.durationColumn}>
                    <MiniDetailsEntry
                        size="sm"
                        icon={iconDurationEl}
                        title={<Duration duration={entryDuration} />}
                        shouldPreventShrink
                    />
                </div>
            ) : (
                invisibleSpacer
            )}
            {entryStartedTimeAgo && (
                <div className={classes.durationColumn}>
                    <MiniDetailsEntry
                        size="sm"
                        icon={iconCreatedEl}
                        title={<TimeAgo duration={entryStartedTimeAgo} />}
                        shouldPreventShrink
                    />
                </div>
            )}
        </div>
    );
};

export const EntryDurationColumn = React.memo(EntryDurationColumnBase);

const invisibleSpacer = <div className={classes.hidden}>.</div>;
const iconDurationEl = <IconClock title="Duration" />;
const iconCreatedEl = <IconCalendar title="Created" />;
