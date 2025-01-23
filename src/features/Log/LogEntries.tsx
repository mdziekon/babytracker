import { Fragment, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Table } from '@mantine/core';
import { LogEntryDisplay } from './LogEntryDisplay';
import { useAppStore } from '../../common/store/store';
import { isTimedEntry } from '../../common/utils/entryGuards';
import { EntryDeleteModal } from '../../common/features/EntryDeleteModal/EntryDeleteModal';
import { useDisclosure } from '@mantine/hooks';
import { LogEntry } from '../../common/store/store.types';
import { formatDateToRelativeLabel } from '../../common/utils/formatting';
import { LogFiltersState } from './LogFilters/LogFilters';

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

        return newEntries;
    }, [filterInProgress, filters, rawEntries]);

    const entriesGroups = useMemo(() => {
        return Object.groupBy(entries, (entry) => {
            const createdAtDate = dayjs(entry.metadata.createdAt);

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

    return (
        <>
            {Object.entries(entriesGroups).map(
                ([groupTitle, groupedEntries]) => {
                    if (!groupedEntries) {
                        return;
                    }

                    return (
                        <Fragment key={groupTitle}>
                            <Table.Tr bg="gray.8">
                                <Table.Th colSpan={4}>{groupTitle}</Table.Th>
                            </Table.Tr>
                            {groupedEntries.map((groupedEntry) => {
                                return (
                                    <LogEntryDisplay
                                        key={groupedEntry.metadata.createdAt}
                                        entry={groupedEntry}
                                        onOpenConfirmDelete={(entry) => {
                                            setConfirmDeleteEntry(entry);
                                            openConfirmDelete();
                                        }}
                                    />
                                );
                            })}
                        </Fragment>
                    );
                }
            )}

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
