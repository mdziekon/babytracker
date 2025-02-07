import { Text, Title } from '@mantine/core';
import classes from './Statistics.module.css';
import { WeightCentileChart } from './WeightCentileChart';
import { useAppStore } from '../../common/store/store';
import { EntryType } from '../../common/store/types/storeData.types';
import dayjs from 'dayjs';

export const WeightStatistics = () => {
    const entries = useAppStore((state) => state.data.logs);

    const weightEntries = entries.filter(
        (entry) => entry.entryType === EntryType.WeightMeasurement
    );

    // TODO: Example data, make this configurable
    const gender = 'MALE';
    const dateOfBirth = dayjs('2020-01-01T12:00:00Z');

    return (
        <>
            <Title className={classes.title} ta="center" mt={16}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Weight Statistics
                </Text>
            </Title>
            <WeightCentileChart
                entries={weightEntries}
                gender={gender}
                dateOfBirth={dateOfBirth}
            />
        </>
    );
};
