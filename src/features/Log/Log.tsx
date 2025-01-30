import { Text, Title } from '@mantine/core';
import classes from './Log.module.css';
import { defaultFilters, LogFilters } from './LogFilters/LogFilters';
import { useState } from 'react';
import { LogsTable } from './LogsTable';

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
            <LogsTable
                filterInProgress={filterInProgress}
                filters={filters}
                hasStickyHeaders
            />
            <LogFilters onChange={setFilters} />
        </>
    );
};
