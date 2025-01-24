import { Box, rem, Table } from '@mantine/core';
import dayjs from 'dayjs';
import { IconClock } from '@tabler/icons-react';
import { DateISO8601, LogEntry } from '../../common/store/store.types';
import { useNavigate } from 'react-router';
import { LogEntryEventMiniDetails } from './LogEntryEventMiniDetails/LogEntryEventMiniDetails';
import classes from './Log.module.css';
import { MiniDetailsEntry } from './LogEntryEventMiniDetails/MiniDetailsEntry/MiniDetailsEntry';
import { EntryTypeIcon } from './LogEntryDisplay/EntryTypeIcon';
import { EntryActions } from './LogEntryDisplay/EntryActions';
import { EntryDates } from './LogEntryDisplay/EntryDates';
import { Duration } from '../../common/features/Duration/Duration';
import { isTimedEntry } from '../../common/utils/entryGuards';
import { routes } from '../../common/routes';
import { useInViewport } from '@mantine/hooks';
import React, { useCallback } from 'react';

interface LogEntryProps {
    entry: LogEntry;
    onOpenConfirmDelete: (entry: LogEntry) => void;
}

const LogEntryDisplayBase = (props: LogEntryProps) => {
    const { entry, onOpenConfirmDelete } = props;
    const navigate = useNavigate();

    const { ref, inViewport } = useInViewport();

    const isInProgress = isTimedEntry(entry) && !entry.params.endedAt;

    const handleGotoEvent = useCallback(() => {
        void navigate(routes.eventView(entry.metadata.uid));
    }, [entry.metadata.uid, navigate]);
    const handleOpenConfirmDelete = useCallback(() => {
        onOpenConfirmDelete(entry);
    }, [entry, onOpenConfirmDelete]);

    const entryTime = (() => {
        if (hasStartedAt(entry)) {
            if (hasEndedAt(entry)) {
                return {
                    started: dayjs(entry.params.startedAt),
                    ended: dayjs(entry.params.endedAt),
                };
            }

            return {
                started: dayjs(entry.params.startedAt),
                ended: null,
            };
        }

        return {
            started: dayjs(entry.metadata.createdAt),
            ended: undefined,
        };
    })();
    const entryDuration = (() => {
        if (!entryTime.ended) {
            return;
        }

        return dayjs.duration(entryTime.ended.diff(entryTime.started));
    })();

    return (
        <Table.Tr
            key={entry.metadata.createdAt}
            ref={ref}
            onClick={handleGotoEvent}
        >
            <Table.Td w={rem(64)} h={rem(64)}>
                <EntryTypeIcon
                    entryType={entry.entryType}
                    isInProgress={isInProgress}
                />
            </Table.Td>
            <Table.Td>
                <EntryDates
                    started={entryTime.started}
                    ended={entryTime.ended}
                />
                <Box>
                    <LogEntryEventMiniDetails event={entry} />
                </Box>
            </Table.Td>
            <Table.Td className={classes.durationColumn}>
                {entryDuration && (
                    <MiniDetailsEntry
                        icon={<IconClock title="Duration" />}
                        title={<Duration duration={entryDuration} />}
                    />
                )}
            </Table.Td>
            <Table.Td
                onClick={onEventStopPropagation}
                className={classes.ctaColumn}
                w={rem(48)}
                align="right"
            >
                <EntryActions
                    entryUid={entry.metadata.uid}
                    onOpenConfirmDelete={handleOpenConfirmDelete}
                />
            </Table.Td>
        </Table.Tr>
    );
};

export const LogEntryDisplay = React.memo(LogEntryDisplayBase);

const hasStartedAt = (
    entry: LogEntry
): entry is LogEntry & { params: { startedAt: DateISO8601 } } => {
    return Object.hasOwn(entry.params ?? {}, 'startedAt');
};
const hasEndedAt = (
    entry: LogEntry
): entry is LogEntry & { params: { endedAt: DateISO8601 } } => {
    return Object.hasOwn(entry.params ?? {}, 'endedAt');
};

const onEventStopPropagation = (event: React.MouseEvent<unknown>) => {
    event.stopPropagation();
};
