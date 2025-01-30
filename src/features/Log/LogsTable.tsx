import { Table } from '@mantine/core';
import classes from './Log.module.css';
import { LogEntries } from './LogEntries';
import { LogFiltersState } from './LogFilters/LogFilters';

interface LogsTable {
    filterInProgress?: boolean;
    filters: LogFiltersState;

    hasStickyHeaders?: boolean;
}

export const LogsTable = (props: LogsTable) => {
    return (
        <Table
            striped
            highlightOnHover
            className={`${classes.logTable} ${props.hasStickyHeaders ? classes.withStickyHeaders : ''}`}
        >
            <Table.Tbody>
                <LogEntries
                    filterInProgress={props.filterInProgress}
                    filters={props.filters}
                />
            </Table.Tbody>
        </Table>
    );
};
