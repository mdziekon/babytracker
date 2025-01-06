import { Table, Text, Title } from '@mantine/core';
import classes from './Log.module.css';
import { DataStorageContext } from '../DataStorage/DataStorageContext';
import { useContext } from 'react';
import { LogEntries } from './LogEntries';

export const Log = () => {
    const contextData = useContext(DataStorageContext);

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
                    <LogEntries entries={contextData?.data.logs ?? []} />
                </Table.Tbody>
            </Table>
        </>
    );
};
