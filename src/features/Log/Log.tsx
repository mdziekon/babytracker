import { Table, Text, Title } from '@mantine/core';
import classes from './Log.module.css';
import { LogEntries } from './LogEntries';

interface LogProps {
    filterInProgress?: boolean;
}

export const Log = (props: LogProps) => {
    const { filterInProgress } = props;

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
                    <LogEntries filterInProgress={filterInProgress} />
                </Table.Tbody>
            </Table>
        </>
    );
};
