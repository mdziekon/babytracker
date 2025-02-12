import { Fragment, useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Group, Table, Text } from '@mantine/core';
import { LogEntryDisplay } from './LogEntryDisplay';
import { useAppStore } from '../../common/store/store';
import { isTimedEntry } from '../../common/utils/entryGuards';
import { EntryDeleteModal } from '../../common/features/EntryDeleteModal/EntryDeleteModal';
import { useDisclosure } from '@mantine/hooks';
import { LogEntry } from '../../common/store/types/storeData.types';
import {
    DEFAULT_DATE_FORMAT,
    formatDateToRelativeLabel,
} from '../../common/utils/formatting';
import { LogFiltersState } from './LogFilters/LogFilters';
import classes from './Log.module.css';

interface LogEntriesProps {
    filterInProgress?: boolean;
    filters: LogFiltersState;
}

export const LogEntries = (props: LogEntriesProps) => {
    const { filterInProgress, filters } = props;
    const rawEntries = useAppStore((state) => state.data.logs);

    const entries = useMemo(() => {
        let newEntries = rawEntries;

        if (filterInProgress) {
            newEntries = newEntries
                .filter(isTimedEntry)
                .filter((entry) => !entry.params.endedAt);
        }
        if (filters.eventType.length !== 0) {
            newEntries = newEntries.filter((entry) => {
                return filters.eventType.includes(
                    entry.entryType.replace('EntryType.', '')
                );
            });
        }
        if (filters.limit && filters.limit > 0) {
            newEntries = newEntries.slice(0, filters.limit);
        }

        return newEntries;
    }, [filterInProgress, filters, rawEntries]);

    const entriesGroups = useMemo(() => {
        return Object.groupBy(entries, (entry) => {
            const createdAtDate = dayjs(entry.metadata.createdAt).startOf(
                'day'
            );

            const relativeLabel = formatDateToRelativeLabel(createdAtDate);

            if (relativeLabel) {
                return relativeLabel;
            }

            return createdAtDate.fromNow();
        });
    }, [entries]);

    const [confirmDeleteEntry, setConfirmDeleteEntry] = useState<
        LogEntry | undefined
    >();
    const [
        isConfirmDeleteOpen,
        { open: openConfirmDelete, close: closeConfirmDelete },
    ] = useDisclosure(false);

    const handleOpenConfirmDelete = useCallback(
        (entry: LogEntry) => {
            setConfirmDeleteEntry(entry);
            openConfirmDelete();
        },
        [openConfirmDelete]
    );

    const entriesGroupsIterable = Object.entries(entriesGroups);

    if (!entriesGroupsIterable.length) {
        return (
            <Table.Tr className={classes.infoRow}>
                <Table.Td colSpan={4}>No entries...</Table.Td>
            </Table.Tr>
        );
    }

    return (
        <>
            {entriesGroupsIterable.map(([groupTitle, groupedEntries]) => {
                if (!groupedEntries || groupedEntries.length === 0) {
                    return;
                }

                const firstEntry = groupedEntries[0];
                const firstEntryDateLabel = dayjs(
                    firstEntry.metadata.createdAt
                ).format(DEFAULT_DATE_FORMAT);

                return (
                    <Fragment key={groupTitle}>
                        <Table.Tr bg="gray.8" className={classes.headerRow}>
                            <Table.Th colSpan={4}>
                                <Group justify="space-between">
                                    <span>{groupTitle}</span>
                                    <Text fw={400} fs="italic" size="sm">
                                        {firstEntryDateLabel}
                                    </Text>
                                </Group>
                            </Table.Th>
                        </Table.Tr>
                        {groupedEntries.map((groupedEntry) => {
                            return (
                                <LogEntryDisplay
                                    key={groupedEntry.metadata.uid}
                                    entry={groupedEntry}
                                    onOpenConfirmDelete={
                                        handleOpenConfirmDelete
                                    }
                                />
                            );
                        })}
                    </Fragment>
                );
            })}

            {confirmDeleteEntry && (
                <EntryDeleteModal
                    entry={confirmDeleteEntry}
                    isModalOpen={isConfirmDeleteOpen}
                    onModalClose={closeConfirmDelete}
                />
            )}
        </>
    );
};
