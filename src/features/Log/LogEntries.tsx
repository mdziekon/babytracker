import { Fragment, useMemo } from 'react';
import { LogEntry } from '../DataStorage/DataStorageContext';
import dayjs from 'dayjs';
import { Table } from '@mantine/core';
import { LogEntryDisplay } from './LogEntryDisplay';

type LogEntriesProps = {
    entries: LogEntry[];
};

export const LogEntries = (props: LogEntriesProps) => {
    const { entries } = props;

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
