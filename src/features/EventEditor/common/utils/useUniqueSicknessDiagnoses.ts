import { useMemo } from 'react';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { isNotNullable } from '../../../../common/utils/typeGuards';

export const useUniqueSicknessDiagnoses = (entries: LogEntry[]) => {
    return useMemo(() => {
        const allMatchingEntries = entries.filter(
            (entry) => entry.entryType === EntryType.Sickness
        );

        const uniqueDiagnoses = new Set(
            allMatchingEntries.map((entry) => entry.params.diagnosis)
        );

        return {
            knownDiagnoses: [...uniqueDiagnoses.values()].filter(isNotNullable),
        };
    }, [entries]);
};
