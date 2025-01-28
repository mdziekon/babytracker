import { Table } from '@mantine/core';
import classes from './Log.module.css';
import { LogEntries } from './LogEntries';
import { LogFiltersState } from './LogFilters/LogFilters';

interface LogsTable {
    filterInProgress?: boolean;
    filters: LogFiltersState;
}

export const LogsTable = (props: LogsTable) => {
    return (
        <Table striped highlightOnHover className={classes.logTable}>
            <Table.Tbody>
                <LogEntries
                    filterInProgress={props.filterInProgress}
                    filters={props.filters}
                />
            </Table.Tbody>
        </Table>
    );
};
