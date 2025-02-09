import { Center, Text, Title } from '@mantine/core';
import classes from './Statistics.module.css';
import { useAppStore } from '../../common/store/store';
import { RoutineChart } from './RoutineChart';
import dayjs from 'dayjs';

export const RoutineStatistics = () => {
    const entries = useAppStore((state) => state.data.logs);

    const now = dayjs();

    // TODO: Does not take into account multiday entries
    const routineEntries = entries.filter((entry) => {
        return now.diff(dayjs(entry.metadata.createdAt), 'day') < 7;
    });

    return (
        <>
            <Title className={classes.title} ta="center" mt={16}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Routine Statistics (last 7 days)
                </Text>
            </Title>
            <Center>
                <RoutineChart entries={routineEntries} />
            </Center>
        </>
    );
};
