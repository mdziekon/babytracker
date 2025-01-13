import { Fragment, useMemo } from 'react';
import dayjs from 'dayjs';
import { Table } from '@mantine/core';
import { LogEntryDisplay } from './LogEntryDisplay';
import { useAppStore } from '../../common/store/store';
import { isTimedEntry } from '../../common/utils/entryGuards';

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
                                <Table.Th colSpan={3}>{groupTitle}</Table.Th>
                            </Table.Tr>
                            {groupedEntries.map((groupedEntry) => {
                                return (
                                    <LogEntryDisplay
                                        key={groupedEntry.metadata.createdAt}
                                        entry={groupedEntry}
                                    />
                                );
                            })}
                        </Fragment>
                    );
                }
            )}
        </>
    );
};
