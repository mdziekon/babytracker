import { Fragment, useMemo } from 'react';
import dayjs from 'dayjs';
import { Table } from '@mantine/core';
import { LogEntryDisplay } from './LogEntryDisplay';
import { useAppStore } from '../../common/store/store';

export const LogEntries = () => {
    const entries = useAppStore((state) => state.data.logs);

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
                            <Table.Tr>
                                <Table.Th colSpan={4}>{groupTitle}</Table.Th>
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
