import dayjs from 'dayjs';
import { LogEntry } from '../../../common/store/types/storeData.types';
import { isTimedEntry } from '../../../common/utils/entryGuards';
import { TimedLogEntries } from '../../../common/store/store.helperTypes';

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

const isClosedTimedEntry = (
    entry: TimedLogEntries
): entry is typeof entry & {
    params: { endedAt: string };
} => {
    return Boolean(entry.params.endedAt);
};

export const getClosedEntryDuration = (
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
