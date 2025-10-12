import { useMemo } from 'react';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { isNotNullable } from '../../../../common/utils/typeGuards';

export const useUniqueMealNames = (entries: LogEntry[]) => {
    return useMemo(() => {
        const allMatchingEntries = entries.filter(
            (entry) => entry.entryType === EntryType.Meal
        );

        const uniqueMealNames = new Set(
            allMatchingEntries.map((entry) => entry.params.mealName)
        );

        return {
            knownMealNames: [...uniqueMealNames.values()].filter(isNotNullable),
        };
    }, [entries]);
};
