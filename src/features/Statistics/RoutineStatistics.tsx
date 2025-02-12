import { Center, Text, Title } from '@mantine/core';
import classes from './Statistics.module.css';
import { useAppStore } from '../../common/store/store';
import { RoutineChart } from './RoutineChart/RoutineChart';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import {
    ClosedTimedEntry,
    filterRoutineChartEntries,
    splitEntriesPerDay,
} from './RoutineChart/RoutineChart.utils';
import { DEFAULT_DATE_FORMAT } from '../../common/utils/formatting';

export const RoutineStatistics = () => {
    const entries = useAppStore((state) => state.data.logs);

    const now = dayjs();

    const entriesByDays = useMemo(() => {
        const routineEntries = entries.filter((entry) => {
            return (
                now.diff(dayjs(entry.metadata.createdAt), 'day') < DAYS_LIMIT
            );
        });
        const ascendingEntries = routineEntries.toReversed();
        const routineChartEntries = filterRoutineChartEntries(ascendingEntries);
        const splitEntries = splitEntriesPerDay(routineChartEntries);

        const groupedEntries = splitEntries.reduce<
            Partial<
                Record<string, { date: Dayjs; entries: ClosedTimedEntry[] }>
            >
        >((accumulator, entry) => {
            const createdAtDay = dayjs(entry.metadata.createdAt);
            const createdAtDayLabel = createdAtDay.format(DEFAULT_DATE_FORMAT);

            if (!accumulator[createdAtDayLabel]) {
                accumulator[createdAtDayLabel] = {
                    date: createdAtDay,
                    entries: [],
                };
            }

            accumulator[createdAtDayLabel].entries.push(entry);

            return accumulator;
        }, {});

        return Object.values(groupedEntries)
            .filter((value): value is NonNullable<typeof value> =>
                Boolean(value)
            )
            .toSorted((left, right) => {
                return left.date.unix() - right.date.unix();
            });
    }, [entries, now]);

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
                <RoutineChart entriesPerDay={entriesByDays} />
            </Center>
        </>
    );
};

const DAYS_LIMIT = 7;
