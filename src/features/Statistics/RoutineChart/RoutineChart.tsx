import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { LogEntry } from '../../../common/store/types/storeData.types';
import { Fragment, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '../../../common/utils/formatting';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../common/utils/entryMappers';
import { Box, Group, Paper, useMantineTheme } from '@mantine/core';
import { Duration } from '../../../common/features/Duration/Duration';
import {
    ClosedTimedEntry,
    filterRoutineChartEntries,
    splitEntriesPerDay,
} from './RoutineChart.utils';

interface RoutineChartProps {
    /**
     * Entries to display, as stored by the Store (ie. in descending order).
     */
    entries: LogEntry[];
}

/**
 * TODO: Proof of Concept of the Pie chart usage
 */
export const RoutineChart = (props: RoutineChartProps) => {
    const { entries } = props;

    const theme = useMantineTheme();

    const entriesByDays = useMemo(() => {
        const ascendingEntries = entries.toReversed();
        const routineChartEntries = filterRoutineChartEntries(ascendingEntries);
        const splitEntries = splitEntriesPerDay(routineChartEntries);

        return Object.groupBy(splitEntries, (entry) => {
            return dayjs(entry.metadata.createdAt).format(DEFAULT_DATE_FORMAT);
        });
    }, [entries]);

    const radiusStartOffset = 30;
    const radius = 20;
    const ringSpacing = 5;

    return (
        <PieChart width={600} height={600}>
            {Object.entries(entriesByDays).map(
                ([dayLabel, dayEntries], index) => {
                    if (!dayEntries?.length) {
                        return <Fragment key={dayLabel} />;
                    }

                    const createPiePart = (
                        entry:
                            | ClosedTimedEntry
                            | {
                                  entryType?: undefined;
                                  params: {
                                      startedAt: Dayjs;
                                      endedAt: Dayjs;
                                  };
                              }
                    ) => {
                        const endedAt = dayjs(entry.params.endedAt);
                        const startedAt = dayjs(entry.params.startedAt);
                        const durationSeconds = endedAt.diff(
                            startedAt,
                            'second'
                        );

                        return {
                            name: entry.entryType
                                ? mapEntryTypeToName(entry.entryType)
                                : 'Nothing',
                            entryUid: entry.entryType
                                ? entry.metadata.uid
                                : '00000000-0000-0000-0000-000000000000',
                            entryType: entry.entryType,
                            color: entry.entryType
                                ? theme.colors[
                                      mapEntryTypeToColor(entry.entryType)
                                  ][5]
                                : '#ffffff10',
                            timePart: durationSeconds / 86400,
                            duration: dayjs.duration(durationSeconds, 'second'),
                            startedAt,
                            endedAt,
                        };
                    };

                    const pieDataEntryParts = dayEntries.map((entry) => {
                        return createPiePart(entry);
                    });

                    const pieDataParts = pieDataEntryParts
                        .map((entryPart, index) => {
                            const previousEntryEndedAt =
                                index === 0
                                    ? entryPart.endedAt.startOf('day')
                                    : pieDataEntryParts[index - 1].endedAt;

                            const previousEntryDiff = entryPart.startedAt.diff(
                                previousEntryEndedAt,
                                'second'
                            );

                            if (previousEntryDiff < 0) {
                                return [];
                            }
                            if (previousEntryDiff === 0) {
                                return [entryPart];
                            }
                            return [
                                createPiePart({
                                    params: {
                                        startedAt: previousEntryEndedAt,
                                        endedAt: entryPart.startedAt,
                                    },
                                }),
                                entryPart,
                            ];
                        })
                        .flat();

                    const fillerLastEntry = (() => {
                        const lastEntry = pieDataParts.at(-1);

                        if (!lastEntry) {
                            return;
                        }

                        const lastEntryEndOfDay =
                            lastEntry.endedAt.endOf('day');

                        if (lastEntry.endedAt.isSame(lastEntryEndOfDay)) {
                            return;
                        }

                        return createPiePart({
                            params: {
                                startedAt: lastEntry.endedAt,
                                endedAt: lastEntryEndOfDay,
                            },
                        });
                    })();

                    if (fillerLastEntry) {
                        pieDataParts.push(fillerLastEntry);
                    }

                    const innerRadius =
                        radiusStartOffset + (radius + ringSpacing) * index;
                    const outerRadius = innerRadius + radius;

                    return (
                        <Pie
                            startAngle={85}
                            endAngle={-265}
                            key={dayLabel}
                            data={pieDataParts}
                            dataKey="timePart"
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            stroke=""
                        >
                            {pieDataParts.map((entry, index) => (
                                <Cell
                                    key={`cell-${String(index)}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                    );
                }
            )}
            <Tooltip
                content={({ payload }) => {
                    // TODO: Fix typings
                    const entryData = payload?.[0];
                    const entryPayload = entryData?.payload;

                    if (!entryData || !entryPayload) {
                        return;
                    }

                    const Icon =
                        entryPayload.entryType &&
                        mapEntryTypeToIcon(entryPayload.entryType);

                    return (
                        <Paper shadow="xs" p="xs">
                            <Group justify="space-between">
                                <Group
                                    justify="flex-start"
                                    gap={8}
                                    style={{
                                        color: Icon
                                            ? entryPayload.color
                                            : undefined,
                                    }}
                                >
                                    {Icon && (
                                        <Icon
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                        />
                                    )}
                                    {entryData.name}
                                </Group>
                                <Box>
                                    <Duration
                                        duration={entryPayload.duration}
                                    />
                                </Box>
                            </Group>
                        </Paper>
                    );
                }}
            />
        </PieChart>
    );
};
