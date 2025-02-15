import { useMemo } from 'react';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { isNotNullable } from '../../../../common/utils/typeGuards';

export const useUniqueOtherSubtypes = (entries: LogEntry[]) => {
    return useMemo(() => {
        const allMatchingEntries = entries.filter(
            (entry) => entry.entryType === EntryType.Other
        );

        const uniqueOtherSubtypes = new Set(
            allMatchingEntries.map((entry) => entry.params.subtype)
        );

        return {
            knownOtherSubtypes: [...uniqueOtherSubtypes.values()].filter(
                isNotNullable
            ),
        };
    }, [entries]);
};
