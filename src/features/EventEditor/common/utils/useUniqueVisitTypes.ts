import { useMemo } from 'react';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { isNotNullable } from '../../../../common/utils/typeGuards';

export const useUniqueVisitTypes = (entries: LogEntry[]) => {
    return useMemo(() => {
        const allMatchingEntries = entries.filter(
            (entry) => entry.entryType === EntryType.DoctorsAppointment
        );

        const uniqueVisitTypes = new Set(
            allMatchingEntries.map((entry) => entry.params.visitType)
        );

        return {
            knownVisitTypes: [...uniqueVisitTypes.values()].filter(
                isNotNullable
            ),
        };
    }, [entries]);
};
