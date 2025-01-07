import { Table, Text, Title } from '@mantine/core';
import classes from './Log.module.css';
import { LogEntries } from './LogEntries';

export const Log = () => {
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
                    <LogEntries />
                </Table.Tbody>
            </Table>
        </>
    );
};
