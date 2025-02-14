import { useMemo } from 'react';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { isNotNullable } from '../../../../common/utils/typeGuards';

export const useUniqueMedicineKinds = (entries: LogEntry[]) => {
    const allMedicineEntries = useMemo(() => {
        return entries.filter(
            (entry) => entry.entryType === EntryType.Medicine
        );
    }, [entries]);

    return useMemo(() => {
        const uniqueNames = new Set(
            allMedicineEntries.map((entry) => entry.params.medicineName)
        );
        const uniqueActiveSubstances = new Set(
            allMedicineEntries.map(
                (entry) => entry.params.medicineActiveSubstance
            )
        );

        return {
            knownMedicineNames: [...uniqueNames.values()].filter(isNotNullable),
            knownMedicineActiveSubstances: [
                ...uniqueActiveSubstances.values(),
            ].filter(isNotNullable),
        };
    }, [allMedicineEntries]);
};
