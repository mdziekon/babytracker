import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { Fragment } from 'react';
import { Dayjs } from 'dayjs';
import { mapEntryTypeToIcon } from '../../../common/utils/entryMappers';
import { Group, Paper, useMantineTheme } from '@mantine/core';
import { Duration } from '../../../common/features/Duration/Duration';
import {
    ClosedTimedEntry,
    createDayWorthChartDataParts,
    createPiePart,
} from './RoutineChart.utils';
import { DEFAULT_DATE_FORMAT } from '../../../common/utils/formatting';

interface RoutineChartProps {
    /**
     * Entries to display, in ascending order
     */
    entriesPerDay: {
        date: Dayjs;
        entries: ClosedTimedEntry[];
    }[];
}

export const RoutineChart = (props: RoutineChartProps) => {
    const { entriesPerDay } = props;

    const theme = useMantineTheme();

    return (
        <PieChart width={400} height={600}>
            {entriesPerDay.map((dayProps, index) => {
                const dayLabel = dayProps.date.format(DEFAULT_DATE_FORMAT);

                if (!dayProps.entries.length) {
                    /**
                     * TODO: Consider displaying an empty pie instead,
                     * so that it is obvious this day does not contain any data.
                     */
                    return <Fragment key={dayLabel} />;
                }

                const pieDataParts = createDayWorthChartDataParts(
                    dayProps.entries,
                    theme
                );

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
            })}
            <Tooltip
                content={({ payload }) => {
                    const entryData = payload?.[0];
                    const piePartData = entryData?.payload as unknown as
                        | ReturnType<typeof createPiePart>
                        | undefined;

                    if (!entryData || !piePartData) {
                        return;
                    }

                    return (
                        <TooltipContent
                            name={entryData.name}
                            piePart={piePartData}
                        />
                    );
                }}
            />
        </PieChart>
    );
};

const TooltipContent = (props: {
    name: string | number | undefined;
    piePart: ReturnType<typeof createPiePart>;
}) => {
    const { name, piePart } = props;

    const IconComponent =
        piePart.entryType && mapEntryTypeToIcon(piePart.entryType);

    return (
        <Paper shadow="md" p="xs">
            <Group justify="space-between">
                <Group
                    justify="flex-start"
                    gap={8}
                    style={{
                        color: IconComponent ? piePart.color : undefined,
                    }}
                >
                    {IconComponent && <IconComponent size={16} />}
                    {name}
                </Group>
                <Duration duration={piePart.duration} />
            </Group>
        </Paper>
    );
};

const radiusStartOffset = 30;
const radius = 20;
const ringSpacing = 5;
