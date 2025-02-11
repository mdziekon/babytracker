import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { LogEntry } from '../../../common/store/types/storeData.types';
import { Fragment, useMemo } from 'react';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '../../../common/utils/formatting';
import { isTimedEntry } from '../../../common/utils/entryGuards';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
} from '../../../common/utils/entryMappers';
import { Box, Group, Paper, useMantineTheme } from '@mantine/core';
import { Duration } from '../../../common/features/Duration/Duration';

interface RoutineChartProps {
    entries: LogEntry[];
}

/**
 * TODO: Proof of Concept of the Pie chart usage
 */
export const RoutineChart = (props: RoutineChartProps) => {
    const { entries } = props;

    const theme = useMantineTheme();

    const entriesByDays = useMemo(() => {
        const splitEntries = entries
            .toReversed()
            .map((entry) => {
                if (!isTimedEntry(entry)) {
                    return [entry];
                }
                if (!entry.params.endedAt) {
                    return [entry];
                }
                if (
                    dayjs(entry.params.startedAt).isSame(
                        dayjs(entry.params.endedAt),
                        'day'
                    )
                ) {
                    return [entry];
                }

                return [
                    {
                        ...entry,
                        params: {
                            ...entry.params,
                            endedAt: dayjs(entry.params.startedAt)
                                .endOf('day')
                                .toISOString(),
                        },
                    } as typeof entry,
                    {
                        ...entry,
                        metadata: {
                            ...entry.metadata,
                            createdAt: dayjs(entry.params.endedAt)
                                .startOf('day')
                                .toISOString(),
                        },
                        params: {
                            ...entry.params,
                            startedAt: dayjs(entry.params.endedAt)
                                .startOf('day')
                                .toISOString(),
                        },
                    } as typeof entry,
                ];
            })
            .flat();

        return Object.groupBy(splitEntries, (entry) => {
            const createdAtDate = dayjs(entry.metadata.createdAt);
            const createdAtDateLabel =
                createdAtDate.format(DEFAULT_DATE_FORMAT);

            return createdAtDateLabel;
        });
    }, [entries]);

    const radiusStartOffset = 30;
    const radius = 20;
    const ringSpacing = 5;

    return (
        <PieChart width={600} height={600}>
            {Object.entries(entriesByDays).map(
                ([dayLabel, dayEntries], index) => {
                    if (!dayEntries) {
                        return <Fragment key={dayLabel} />;
                    }

                    const finalDayEntries = dayEntries
                        .filter((entry) => isTimedEntry(entry))
                        .filter(
                            (
                                entry
                            ): entry is typeof entry & {
                                params: { endedAt: string };
                            } => {
                                return Boolean(entry.params.endedAt);
                            }
                        )
                        .filter((entry) => {
                            const diff = dayjs(entry.params.endedAt).diff(
                                dayjs(entry.params.startedAt),
                                'second'
                            );

                            return diff >= 10;
                        });

                    if (!finalDayEntries.length) {
                        return <Fragment key={dayLabel} />;
                    }

                    const pieDataEntryParts = finalDayEntries.map((entry) => {
                        const durationSeconds = dayjs(
                            entry.params.endedAt
                        ).diff(entry.params.startedAt, 'second');

                        return {
                            name: entry.entryType.replace('EntryType.', ''),
                            entryUid: entry.metadata.uid,
                            entryType: entry.entryType,
                            color: theme.colors[
                                mapEntryTypeToColor(entry.entryType)
                            ][5],
                            timePart: durationSeconds / 86400,
                            duration: dayjs.duration(durationSeconds, 'second'),
                            startedAt: entry.params.startedAt,
                            endedAt: entry.params.endedAt,
                        };
                    });

                    const pieDataParts = pieDataEntryParts
                        .map((entryPart, index) => {
                            const previousEntryEndedAt =
                                index === 0
                                    ? dayjs(entryPart.endedAt)
                                          .startOf('day')
                                          .toISOString()
                                    : pieDataEntryParts[index - 1].endedAt;

                            const previousEntryEndedAtDate =
                                dayjs(previousEntryEndedAt);

                            const previousEntryDiff = dayjs(
                                entryPart.startedAt
                            ).diff(previousEntryEndedAtDate, 'second');

                            const parts: (
                                | typeof entryPart
                                | (Omit<typeof entryPart, 'entryType'> & {
                                      entryType: undefined;
                                  })
                            )[] = [];

                            if (previousEntryDiff < 0) {
                                return [];
                            }

                            if (previousEntryDiff > 0) {
                                parts.push({
                                    name: 'Nothing',
                                    entryUid:
                                        '00000000-0000-0000-0000-000000000000',
                                    entryType: undefined,
                                    color: '#ffffff10',
                                    timePart: previousEntryDiff / 86400,
                                    duration: dayjs.duration(
                                        previousEntryDiff,
                                        'second'
                                    ),
                                    startedAt: previousEntryEndedAt,
                                    endedAt: entryPart.startedAt,
                                });
                            }

                            return [...parts, entryPart];
                        })
                        .flat();

                    (() => {
                        const lastEntry = pieDataParts.at(-1);

                        if (!lastEntry) {
                            return;
                        }

                        const endOfDayEntry = {
                            name: 'Nothing',
                            entryUid: '00000000-0000-0000-0000-000000000000',
                            entryType: undefined,
                            color: '#ffffff10',
                            timePart: 0,
                            duration: dayjs.duration(0, 'second'),
                            startedAt: '',
                            endedAt: '',
                        };

                        const previousEntryEndedAt = lastEntry.endedAt;

                        const previousEntryEndedAtDate =
                            dayjs(previousEntryEndedAt);

                        endOfDayEntry.startedAt = previousEntryEndedAtDate
                            .add(1, 'second')
                            .toISOString();
                        endOfDayEntry.endedAt = previousEntryEndedAtDate
                            .endOf('day')
                            .toISOString();

                        const endOfDayEntryDiff = dayjs(
                            endOfDayEntry.endedAt
                        ).diff(dayjs(endOfDayEntry.startedAt), 'second');

                        endOfDayEntry.timePart = endOfDayEntryDiff / 86400;
                        endOfDayEntry.duration = dayjs.duration(
                            endOfDayEntryDiff,
                            'second'
                        );

                        if (endOfDayEntryDiff <= 0) {
                            return;
                        }

                        pieDataParts.push(endOfDayEntry);
                    })();

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
