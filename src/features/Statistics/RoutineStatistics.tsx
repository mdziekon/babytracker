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

    const nowStartOfDay = dayjs().startOf('day');

    const entriesByDays = useMemo(() => {
        const routineEntries = entries.filter((entry) => {
            return (
                nowStartOfDay.diff(
                    dayjs(entry.metadata.createdAt).startOf('day'),
                    'day'
                ) <
                DAYS_LIMIT + 1
            );
        });
        const ascendingEntries = routineEntries.toReversed();
        const routineChartEntries = filterRoutineChartEntries(ascendingEntries);
        const splitEntries = splitEntriesPerDay(routineChartEntries);
        const splitEntriesInRange = splitEntries.filter((entry) => {
            return (
                nowStartOfDay.diff(
                    dayjs(entry.params.startedAt).startOf('day'),
                    'day'
                ) < DAYS_LIMIT
            );
        });

        const groupedEntries = splitEntriesInRange.reduce<
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

        /**
         * Create "per day" slots, regardless whether there's actually any entries,
         * so that all days are being represented on the chart.
         */
        return Array.from({ length: DAYS_LIMIT }, (_, idx) => {
            const date = nowStartOfDay.subtract(idx, 'day');
            const dateLabel = date.format(DEFAULT_DATE_FORMAT);
            const dayProps = groupedEntries[dateLabel];

            return {
                date: nowStartOfDay.subtract(idx, 'day'),
                entries: dayProps?.entries ?? [],
            };
        }).toReversed();
    }, [entries, nowStartOfDay]);

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
