import { ActionIcon, Avatar, rem, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { IconDots } from '@tabler/icons-react';
import { DateISO8601, LogEntry } from '../../common/store/store.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../common/utils/entryMappers';
import { useNavigate } from 'react-router';

interface LogEntryProps {
    entry: LogEntry;
}

export const LogEntryDisplay = (props: LogEntryProps) => {
    const { entry } = props;
    const navigate = useNavigate();

    const entryTime = (() => {
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
        <Table.Tr
            key={entry.metadata.createdAt}
            onClick={() => {
                void navigate(`/event/edit/${entry.metadata.uid}`);
            }}
        >
            <Table.Td w={rem(64)}>
                <Avatar
                    title={mapEntryTypeToName(entry.entryType)}
                    color={mapEntryTypeToColor(entry.entryType)}
                >
                    <EntryTypeIcon
                        style={{
                            width: rem(24),
                            height: rem(24),
                        }}
                    />
                </Avatar>
            </Table.Td>
            <Table.Td>
                {entryTime.length === 1 ? (
                    dayjs(entryTime[0]).format('HH:mm')
                ) : (
                    <>
                        {dayjs(entryTime[0]).format('HH:mm')}
                        {' - '}
                        {entryTime[1] ? (
                            dayjs(entryTime[1]).format('HH:mm')
                        ) : (
                            <Text component="span" fs="italic">
                                In progress
                            </Text>
                        )}
                    </>
                )}
            </Table.Td>
            <Table.Td>0m</Table.Td>
            <Table.Td
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <ActionIcon variant="default" size="sm">
                    <IconDots style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    );
};
