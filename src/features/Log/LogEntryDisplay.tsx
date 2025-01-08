import { ActionIcon, Avatar, Table } from '@mantine/core';
import dayjs from 'dayjs';
import {
    IconBabyBottle,
    IconBrandMcdonalds,
    IconDiaper,
    IconDots,
    IconWeight,
} from '@tabler/icons-react';
import {
    DateISO8601,
    EntryType,
    LogEntry,
} from '../../common/store/store.types';

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

    const entryTypeDisplay = (() => {
        switch (entry.entryType) {
            case EntryType.BottleFeeding:
                return (
                    <IconBabyBottle style={{ width: '70%', height: '70%' }} />
                );
            case EntryType.BreastFeeding:
                return (
                    <IconBrandMcdonalds
                        style={{ width: '70%', height: '70%' }}
                    />
                );
            case EntryType.DiaperChange:
                return <IconDiaper style={{ width: '70%', height: '70%' }} />;
            case EntryType.WeightMeasurement:
                return <IconWeight style={{ width: '70%', height: '70%' }} />;
        }

        return (
            <span>
                {(entry as { entryType: string }).entryType.replace(
                    'EntryType.',
                    ''
                )}
            </span>
        );
    })();

    return (
        <Table.Tr key={entry.metadata.createdAt}>
            <Table.Td>
                <Avatar
                    title={entry.entryType.replace('EntryType.', '')}
                    color="primary"
                >
                    {entryTypeDisplay}
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
