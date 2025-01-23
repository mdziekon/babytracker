import { Table, Text, Title } from '@mantine/core';
import classes from './Log.module.css';
import { LogEntries } from './LogEntries';
import { defaultFilters, LogFilters } from './LogFilters/LogFilters';
import { useState } from 'react';

interface LogProps {
    filterInProgress?: boolean;
}

export const Log = (props: LogProps) => {
    const { filterInProgress } = props;

    const [filters, setFilters] = useState(defaultFilters);

    return (
        <>
            <Title className={classes.title} ta="center" mt={16}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Events log
                </Text>
            </Title>
            <Table striped highlightOnHover className={classes.logTable}>
                <Table.Tbody>
                    <LogEntries
                        filterInProgress={filterInProgress}
                        filters={filters}
                    />
                </Table.Tbody>
            </Table>
            <LogFilters onChange={setFilters} />
        </>
    );
};
