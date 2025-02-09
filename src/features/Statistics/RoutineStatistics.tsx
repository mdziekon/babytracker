import { Center, Text, Title } from '@mantine/core';
import classes from './Statistics.module.css';
import { useAppStore } from '../../common/store/store';
import { RoutineChart } from './RoutineChart';

export const RoutineStatistics = () => {
    const entries = useAppStore((state) => state.data.logs);

    // TODO: For testing purposes, limit to 100 entries
    const routingEntries = entries.filter((_entry, index) => index < 100);

    return (
        <>
            <Title className={classes.title} ta="center" mt={16}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Routine Statistics
                </Text>
            </Title>
            <Center>
                <RoutineChart entries={routingEntries} />
            </Center>
        </>
    );
};
