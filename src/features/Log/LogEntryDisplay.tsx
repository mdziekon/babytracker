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

interface LogEntryProps {
    entry: LogEntry;
    onOpenConfirmDelete: (entry: LogEntry) => void;
}

export const LogEntryDisplay = (props: LogEntryProps) => {
    const { entry, onOpenConfirmDelete } = props;
    const navigate = useNavigate();

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
            onClick={() => {
                void navigate(`/event/edit/${entry.metadata.uid}`);
            }}
        >
            <Table.Td w={rem(64)} h={rem(64)}>
                <EntryTypeIcon entryType={entry.entryType} />
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
                    onOpenConfirmDelete={() => {
                        onOpenConfirmDelete(entry);
                    }}
                />
            </Table.Td>
        </Table.Tr>
    );
};

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
