import dayjs, { Dayjs } from 'dayjs';
import { LogEntry } from '../../../common/store/types/storeData.types';
import { isTimedEntry } from '../../../common/utils/entryGuards';
import { TimedLogEntries } from '../../../common/store/store.helperTypes';
import {
    mapEntryTypeToColor,
    mapEntryTypeToName,
} from '../../../common/utils/entryMappers';
import { MantineTheme } from '@mantine/core';

/**
 * Filters out entries which:
 * - are not TimedEntries
 * - do not have endedAt property yet
 * - are too short
 */
export const filterRoutineChartEntries = (entries: LogEntry[]) => {
    return entries
        .filter((entry) => {
            return isTimedEntry(entry) && isClosedTimedEntry(entry);
        })
        .filter((entry) => getClosedEntryDuration(entry) >= 10);
};

type ClosedTimedEntry = TimedLogEntries & {
    params: { endedAt: string };
};

const isClosedTimedEntry = (
    entry: TimedLogEntries
): entry is ClosedTimedEntry => {
    return Boolean(entry.params.endedAt);
};

const getClosedEntryDuration = (
    entry: TimedLogEntries & {
        params: { endedAt: string };
    }
) => {
    return dayjs(entry.params.endedAt).diff(
        dayjs(entry.params.startedAt),
        'second'
    );
};

/**
 * Splits entries spanning more than one day into two entries for each day,
 * then returns everything as flat array.
 * Note: assumes ascending order of entries.
 */
export const splitEntriesPerDay = <EntryType extends LogEntry>(
    entries: EntryType[]
) => {
    return entries
        .map((entry) => {
            if (!isTimedEntry(entry) || !entry.params.endedAt) {
                return [entry];
            }

            const startedAtDay = dayjs(entry.params.startedAt);
            const endedAtDay = dayjs(entry.params.endedAt);

            if (startedAtDay.isSame(endedAtDay, 'day')) {
                return [entry];
            }

            return [
                {
                    ...entry,
                    params: {
                        ...entry.params,
                        endedAt: startedAtDay.endOf('day').toISOString(),
                    },
                } as typeof entry,
                {
                    ...entry,
                    metadata: {
                        ...entry.metadata,
                        createdAt: endedAtDay.startOf('day').toISOString(),
                    },
                    params: {
                        ...entry.params,
                        startedAt: endedAtDay.startOf('day').toISOString(),
                    },
                } as typeof entry,
            ];
        })
        .flat();
};

export const createPiePart = (
    entry:
        | ClosedTimedEntry
        | {
              entryType?: undefined;
              params: {
                  startedAt: Dayjs;
                  endedAt: Dayjs;
              };
          },
    theme: MantineTheme
) => {
    const endedAt = dayjs(entry.params.endedAt);
    const startedAt = dayjs(entry.params.startedAt);
    const durationSeconds = endedAt.diff(startedAt, 'second');

    return {
        name: entry.entryType ? mapEntryTypeToName(entry.entryType) : 'Nothing',
        entryUid: entry.entryType
            ? entry.metadata.uid
            : '00000000-0000-0000-0000-000000000000',
        entryType: entry.entryType,
        color: entry.entryType
            ? theme.colors[mapEntryTypeToColor(entry.entryType)][5]
            : '#ffffff10',
        timePart: durationSeconds / 86400,
        duration: dayjs.duration(durationSeconds, 'second'),
        startedAt,
        endedAt,
    };
};

/**
 * @param entries Entries which were all created and have ended at the same day.
 */
export const createDayWorthChartDataParts = (
    entries: ClosedTimedEntry[],
    theme: MantineTheme
) => {
    const pieDataParts = entries
        .map((entry) => {
            return createPiePart(entry, theme);
        })
        .map((entryDataPart, idx, allEntryParts) => {
            /**
             * Create virtual "start of day" entryPart in case first real entry
             * does not start at 00:00:00.
             */
            const previousEntryEndedAt =
                idx === 0
                    ? entryDataPart.endedAt.startOf('day')
                    : allEntryParts[idx - 1].endedAt;

            const previousEntryDiff = entryDataPart.startedAt.diff(
                previousEntryEndedAt,
                'second'
            );

            if (previousEntryDiff < 0) {
                return [];
            }
            if (previousEntryDiff === 0) {
                return [entryDataPart];
            }
            return [
                createPiePart(
                    {
                        params: {
                            startedAt: previousEntryEndedAt,
                            endedAt: entryDataPart.startedAt,
                        },
                    },
                    theme
                ),
                entryDataPart,
            ];
        })
        .flat();

    /**
     * If last entry does not end at 23:59:59, create a virtual "end of day" entry.
     */
    const endOfDayDataPart = (() => {
        const lastEntry = pieDataParts.at(-1);

        if (!lastEntry) {
            return;
        }

        const lastEntryEndOfDay = lastEntry.endedAt.endOf('day');

        if (lastEntry.endedAt.isSame(lastEntryEndOfDay)) {
            return;
        }

        return createPiePart(
            {
                params: {
                    startedAt: lastEntry.endedAt,
                    endedAt: lastEntryEndOfDay,
                },
            },
            theme
        );
    })();

    if (endOfDayDataPart) {
        pieDataParts.push(endOfDayDataPart);
    }

    return pieDataParts;
};
