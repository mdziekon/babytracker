import { ActionIcon, Avatar, Table } from '@mantine/core';
import dayjs from 'dayjs';
import { IconDots } from '@tabler/icons-react';
import { DateISO8601, LogEntry } from '../../common/store/store.types';
import {
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../common/utils/entryMappers';

interface LogEntryProps {
    entry: LogEntry;
}

export const LogEntryDisplay = (props: LogEntryProps) => {
    const { entry } = props;

    const entryTime = (() => {
        const hasStartedAt = (
            entry: LogEntry
        ): entry is LogEntry & { params: { startedAt: DateISO8601 } } => {
            return Object.hasOwn(entry.params, 'startedAt');
        };
        const hasEndedAt = (
            entry: LogEntry
        ): entry is LogEntry & { params: { endedAt: DateISO8601 } } => {
            return Object.hasOwn(entry.params, 'endedAt');
        };

        if (hasStartedAt(entry)) {
            if (hasEndedAt(entry)) {
                return [entry.params.startedAt, entry.params.endedAt] as const;
            }

            return [entry.params.startedAt, undefined] as const;
        }

        return [entry.metadata.createdAt] as const;
    })();

    const EntryTypeIcon = mapEntryTypeToIcon(entry.entryType);

    return (
        <Table.Tr key={entry.metadata.createdAt}>
            <Table.Td>
                <Avatar
                    title={mapEntryTypeToName(entry.entryType)}
                    color="primary"
                >
                    <EntryTypeIcon style={{ width: '70%', height: '70%' }} />
                </Avatar>
            </Table.Td>
            <Table.Td>
                {entryTime.length === 1
                    ? dayjs(entryTime[0]).format('HH:mm')
                    : `${dayjs(entryTime[0]).format('HH:mm')} - ${entryTime[1] ? dayjs(entryTime[1]).format('HH:mm') : '...'}`}
            </Table.Td>
            <Table.Td>0m</Table.Td>
            <Table.Td>
                <ActionIcon variant="default" size="sm">
                    <IconDots style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    );
};
