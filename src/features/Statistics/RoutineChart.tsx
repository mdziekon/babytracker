import { Cell, Pie, PieChart } from 'recharts';
import { LogEntry } from '../../common/store/types/storeData.types';
import { Fragment, useMemo } from 'react';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '../../common/utils/formatting';
import { isTimedEntry } from '../../common/utils/entryGuards';
import { mapEntryTypeToColor } from '../../common/utils/entryMappers';
import { useMantineTheme } from '@mantine/core';

interface RoutineChartProps {
    entries: LogEntry[];
}

/**
 * TODO: Proof of Concept of the Pie chart usage
 */
export const RoutineChart = (props: RoutineChartProps) => {
    const { entries } = props;

    const theme = useMantineTheme();

    /**
     * TODO: Entries crossing days boundaries need to be split to properly
     * display on the chart
     */
    const entriesByDays = useMemo(() => {
        return Object.groupBy(entries.toReversed(), (entry) => {
            const createdAtDate = dayjs(entry.metadata.createdAt);
            const createdAtDateLabel =
                createdAtDate.format(DEFAULT_DATE_FORMAT);

            return createdAtDateLabel;
        });
    }, [entries]);

    const radiusStartOffset = 30;
    const radius = 10;
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
                        );

                    if (!finalDayEntries.length) {
                        return <Fragment key={dayLabel} />;
                    }

                    const pieDataEntryParts = finalDayEntries.map((entry) => {
                        return {
                            entryUid: entry.metadata.uid,
                            entryType: entry.entryType,
                            timePart:
                                dayjs(entry.params.endedAt).diff(
                                    entry.params.startedAt,
                                    'second'
                                ) / 86400,
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
                                    entryUid:
                                        '00000000-0000-0000-0000-000000000000',
                                    entryType: undefined,
                                    timePart: previousEntryDiff / 86400,
                                    startedAt: previousEntryEndedAt,
                                    endedAt: entryPart.startedAt,
                                });
                            }

                            return [...parts, entryPart];
                        })
                        .flat();

                    return (
                        <Pie
                            startAngle={85}
                            endAngle={-265}
                            key={dayLabel}
                            data={pieDataParts}
                            dataKey="timePart"
                            cx="50%"
                            cy="50%"
                            innerRadius={
                                radiusStartOffset +
                                (radius + ringSpacing) * index
                            }
                            outerRadius={
                                radiusStartOffset +
                                (radius + ringSpacing) * index +
                                radius
                            }
                            fill="#8884d8"
                            stroke=""
                        >
                            {pieDataParts.map((entry, index) => (
                                <Cell
                                    key={`cell-${String(index)}`}
                                    fill={
                                        entry.entryType
                                            ? theme.colors[
                                                  mapEntryTypeToColor(
                                                      entry.entryType
                                                  )
                                              ][5]
                                            : '#ffffff'
                                    }
                                />
                            ))}
                        </Pie>
                    );
                }
            )}
        </PieChart>
    );
};
