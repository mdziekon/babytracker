import dayjs, { Dayjs } from 'dayjs';
import { EntryType, LogEntry } from '../../common/store/types/storeData.types';
import { weightCentilesPerDayMaleCSV } from './data/weightCentilesPerDayMale.raw';
import { ChartTooltip, LineChart } from '@mantine/charts';
import { weightCentilesPerDayFemaleCSV } from './data/weightCentilesPerDayFemale.raw';

interface WeightCentileChartProps {
    entries: (LogEntry & { entryType: EntryType.WeightMeasurement })[];
    gender: 'MALE' | 'FEMALE';
    dateOfBirth: Dayjs;
}

export const WeightCentileChart = (props: WeightCentileChartProps) => {
    const { entries, gender, dateOfBirth } = props;

    const age = (() => {
        if (!entries[0]) {
            return dayjs.duration(Infinity);
        }

        const lastEntryDate = dayjs(entries[0].metadata.createdAt);

        return dayjs.duration(lastEntryDate.diff(dateOfBirth));
    })();

    const recommendedRange = (() => {
        if (age.years() >= 3) {
            /**
             * 5 years
             */
            return {
                filter: (days: number) => days < 1800,
                skip: 180,
                xAxisLabel: 'Year',
                xAxisDivider: 180,
                xAxisLabelMultiplier: 0.5,
            };
        }
        if (age.years() > 0) {
            /**
             * 3 years
             */
            return {
                filter: (days: number) => days < 1080,
                skip: 90,
                xAxisLabel: 'Month',
                xAxisDivider: 30,
            };
        }
        if (age.months() >= 3) {
            /**
             * 1 year
             */
            return {
                filter: (days: number) => days < 365,
                skip: 30,
                xAxisLabel: 'Month',
                xAxisDivider: 30,
            };
        }
        if (age.months() > 0) {
            /**
             * 3 months
             */
            return {
                filter: (days: number) => days < 90,
                skip: 7,
                xAxisLabel: 'Week',
                xAxisDivider: 7,
            };
        }
        /**
         * 1 month
         */
        return {
            filter: (days: number) => days < 31,
            skip: 1,
            xAxisLabel: 'Day',
            xAxisDivider: 1,
        };
    })();

    const percentileDataPoints = (() => {
        const data = readPercentilesCSV(gender)
            .filter((data) => recommendedRange.filter(data.ageDays))
            .filter((_data, index) => index % recommendedRange.skip === 0);

        return Object.groupBy(data, (item) => String(item.ageDays));
    })();

    const weightDataPoints = (() => {
        const data = entries.map((entry) => {
            const entryDate = dayjs(entry.metadata.createdAt);
            const day = Math.floor(
                dayjs.duration(entryDate.diff(dateOfBirth)).asDays()
            );

            return {
                ageDays: day,
                weightMeasure: entry.params.weightValue / 1000,
            };
        });

        return Object.groupBy(data, (item) => String(item.ageDays));
    })();

    const days = [
        ...new Set([
            ...Object.keys(percentileDataPoints),
            ...Object.keys(weightDataPoints),
        ]).values(),
    ].toSorted((left, right) => compareAsc(Number(left), Number(right)));

    const allDataPoints = (() => {
        return days.map((day) => {
            const percentileDay = percentileDataPoints[day]?.[0];
            const weightDay = weightDataPoints[day]?.[0];

            return {
                ...percentileDay,
                ...weightDay,
                ageDays: Number(day),
            };
        });
    })();

    const dataPointWithLowestValue = allDataPoints.toSorted((left, right) => {
        const leftMin = Math.min(
            left.p03 ?? Infinity,
            left.weightMeasure ?? Infinity
        );
        const rightMin = Math.min(
            right.p03 ?? Infinity,
            right.weightMeasure ?? Infinity
        );

        return compareAsc(leftMin, rightMin);
    })[0];
    const dataPointWithHighestValue = allDataPoints.toSorted((left, right) => {
        const leftMax = Math.max(
            left.p97 ?? -Infinity,
            left.weightMeasure ?? -Infinity
        );
        const rightMax = Math.max(
            right.p97 ?? -Infinity,
            right.weightMeasure ?? -Infinity
        );

        return compareDesc(leftMax, rightMax);
    })[0];

    return (
        <LineChart
            h={600}
            data={allDataPoints}
            dataKey="ageDays"
            dotProps={{ r: 1.8 }}
            activeDotProps={{ r: 3, strokeWidth: 1 }}
            series={[
                { name: 'p97', color: 'red.9', strokeDasharray: '12 8' },
                { name: 'p90', color: 'orange.6' },
                { name: 'p75', color: 'yellow.5', strokeDasharray: '6 6' },
                { name: 'p50', color: 'lime.5' },
                { name: 'p25', color: 'yellow.5', strokeDasharray: '6 6' },
                { name: 'p10', color: 'orange.6' },
                { name: 'p03', color: 'red.9', strokeDasharray: '12 8' },
                { name: 'weightMeasure', color: 'blue.6' },
            ]}
            curveType="monotone"
            tickLine="xy"
            gridAxis="xy"
            strokeWidth={1.5}
            yAxisProps={{
                domain: [
                    Math.min(
                        dataPointWithLowestValue.p03 ?? Infinity,
                        dataPointWithLowestValue.weightMeasure ?? Infinity
                    ),
                    Math.max(
                        dataPointWithHighestValue.p97 ?? -Infinity,
                        dataPointWithHighestValue.weightMeasure ?? -Infinity
                    ),
                ],
            }}
            xAxisProps={{
                ticks: Object.keys(percentileDataPoints).map((tick) =>
                    Number(tick)
                ),
                domain: [
                    dataPointWithLowestValue.ageDays,
                    dataPointWithHighestValue.ageDays,
                ],
                type: 'number',
                dataKey: 'ageDays',
                tickFormatter: (label: number) =>
                    String(
                        (label / recommendedRange.xAxisDivider) *
                            (recommendedRange.xAxisLabelMultiplier ?? 1)
                    ),
            }}
            xAxisLabel={`${recommendedRange.xAxisLabel}s`}
            valueFormatter={(value) => `${value.toFixed(2)} kg`}
            tooltipProps={{
                content: ({ label, payload }) => {
                    const finalLabel = (() => {
                        if (label % recommendedRange.xAxisDivider === 0) {
                            return `${recommendedRange.xAxisLabel} ${String((label / recommendedRange.xAxisDivider) * (recommendedRange.xAxisLabelMultiplier ?? 1))}`;
                        }

                        /**
                         * TODO: Improve labeling of raw measurements.
                         * Either display date, or divisions as per divider + smaller divisions.
                         */
                        return `Day ${String(label)}`;
                    })();

                    return (
                        <ChartTooltip label={finalLabel} payload={payload} />
                    );
                },
            }}
        />
    );
};

/**
 * TODO: Investigate if this can be loaded "on demand" or at least if it can be compressed
 */
const readPercentilesCSV = (gender: 'MALE' | 'FEMALE') => {
    const file =
        gender === 'MALE'
            ? weightCentilesPerDayMaleCSV
            : weightCentilesPerDayFemaleCSV;

    return file
        .trim()
        .split('\n')
        .map((line) => line.replaceAll(',', '.').split(';'))
        .map((lineData) => {
            return {
                ageDays: parseInt(lineData[0], 10),
                p03: parseFloat(lineData[4]),
                p10: parseFloat(lineData[5]),
                p25: parseFloat(lineData[6]),
                p50: parseFloat(lineData[7]),
                p75: parseFloat(lineData[8]),
                p90: parseFloat(lineData[9]),
                p97: parseFloat(lineData[10]),
            };
        });
};

const compareAsc = (left: number, right: number) => {
    if (left < right) {
        return -1;
    }
    if (left > right) {
        return 1;
    }
    return 0;
};
const compareDesc = (left: number, right: number) => {
    if (left > right) {
        return -1;
    }
    if (left < right) {
        return 1;
    }
    return 0;
};
