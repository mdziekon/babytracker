import dayjs from 'dayjs';
import { LogEntry } from '../../../common/store/types/storeData.types';
import { isTimedEntry } from '../../../common/utils/entryGuards';

/**
 * Splits entries spanning more than one day into two entries for each day,
 * then returns everything as flat array.
 * Note: assumes ascending order of entries.
 */
export const splitEntriesPerDay = (entries: LogEntry[]) => {
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
