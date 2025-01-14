import { Fragment, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Table } from '@mantine/core';
import { LogEntryDisplay } from './LogEntryDisplay';
import { useAppStore } from '../../common/store/store';
import { isTimedEntry } from '../../common/utils/entryGuards';
import { EntryDeleteModal } from '../../common/features/EntryDeleteModal/EntryDeleteModal';
import { useDisclosure } from '@mantine/hooks';
import { LogEntry } from '../../common/store/store.types';

interface LogEntriesProps {
    filterInProgress?: boolean;
}

export const LogEntries = (props: LogEntriesProps) => {
    const { filterInProgress } = props;
    const rawEntries = useAppStore((state) => state.data.logs);

    const entries = useMemo(() => {
        let newEntries = rawEntries;

        if (filterInProgress) {
            newEntries = newEntries
                .filter(isTimedEntry)
                .filter((entry) => !entry.params.endedAt);
        }

        return newEntries;
    }, [filterInProgress, rawEntries]);

    const entriesGroups = useMemo(() => {
        return Object.groupBy(entries, (entry) => {
            const createdAtDate = dayjs(entry.metadata.createdAt);

            // TODO: localize
            if (createdAtDate.isToday()) {
                return 'Today';
            }
            if (createdAtDate.isYesterday()) {
                return 'Yesterday';
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
