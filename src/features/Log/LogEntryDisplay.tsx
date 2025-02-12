import { Table } from '@mantine/core';
import dayjs, { Dayjs } from 'dayjs';
import {
    DateISO8601,
    LogEntry,
} from '../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { LogEntryEventMiniDetails } from './LogEntryEventMiniDetails/LogEntryEventMiniDetails';
import classes from './Log.module.css';
import { EntryTypeIcon } from './LogEntryDisplay/EntryTypeIcon';
import { EntryActions } from './LogEntryDisplay/EntryActions';
import { EntryDates } from './LogEntryDisplay/EntryDates';
import { isTimedEntry } from '../../common/utils/entryGuards';
import { routes } from '../../common/routes';
import { useInViewport } from '@mantine/hooks';
import React, { useCallback, useMemo } from 'react';
import { EntryDurationColumn } from './LogEntryDisplay/EntryDurationColumn';

interface LogEntryProps {
    entry: LogEntry;
    now: Dayjs;
    onOpenConfirmDelete: (entry: LogEntry) => void;
}

const LogEntryDisplayBase = (props: LogEntryProps) => {
    const { entry, now, onOpenConfirmDelete } = props;
    const navigate = useNavigate();

    const { ref, inViewport } = useInViewport();

    const isInProgress = isTimedEntry(entry) && !entry.params.endedAt;

    const handleGotoEvent = useCallback(() => {
        void navigate(routes.eventView(entry.metadata.uid));
    }, [entry.metadata.uid, navigate]);
    const handleOpenConfirmDelete = useCallback(() => {
        onOpenConfirmDelete(entry);
    }, [entry, onOpenConfirmDelete]);

    const entryTime = useMemo(() => {
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
    }, [entry]);

    return (
        <Table.Tr
            key={entry.metadata.createdAt}
            ref={ref}
            onClick={handleGotoEvent}
        >
            <Table.Td className={classes.iconColumn}>
                <EntryTypeIcon
                    entryType={entry.entryType}
                    isInProgress={isInProgress}
                />
            </Table.Td>
            <Table.Td>
                {inViewport && (
                    <>
                        <EntryDates
                            started={entryTime.started}
                            ended={entryTime.ended}
                        />
                        <LogEntryEventMiniDetails event={entry} />
                    </>
                )}
            </Table.Td>
            <Table.Td className={classes.durationColumn}>
                {inViewport && (
                    <EntryDurationColumn
                        started={entryTime.started}
                        ended={entryTime.ended}
                        now={now}
                    />
                )}
            </Table.Td>
            <Table.Td
                onClick={onEventStopPropagation}
                className={classes.ctaColumn}
                align="right"
            >
                {inViewport && (
                    <EntryActions
                        entryUid={entry.metadata.uid}
                        onOpenConfirmDelete={handleOpenConfirmDelete}
                    />
                )}
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
