import { EntryType, LogEntry, MedicineDoseType } from './types/storeData.types';
import { AppState } from './types/appState.types';
import { v4 as uuidv4 } from 'uuid';

export const performStoreMigration = (
    persistedState: unknown,
    persistedVersion: number
) => {
    console.log('Checking migrations');

    let migratedState = persistedState;
    let migratedVersion = persistedVersion;

    /**
     * Migrate v1 -> v2
     * ---
     * Changelog:
     * - Added `data.logs[].metadata.uid`
     */
    if (migratedVersion === 1) {
        console.log(
            `Migrating persistedState to version ${String(migratedVersion + 1)}`
        );

        const oldState = migratedState as { data: AppState['data'] };

        migratedState = {
            ...oldState,
            data: {
                ...oldState.data,
                logs: oldState.data.logs.map((entry) => {
                    return {
                        ...entry,
                        metadata: {
                            ...entry.metadata,
                            uid: uuidv4(),
                        },
                    };
                }),
            },
        };
        migratedVersion = migratedVersion + 1;

        console.log(
            `Migrated persistedState to version ${String(migratedVersion)}`
        );
    }

    /**
     * Migrate v2 -> v3
     * ---
     * Changelog:
     * - No data schema change
     * - Migrate entries with "MIGRATE_MEDICINE" note to EntryType.Medicine
     *  - Use "NAME_{MEDICINE_NAME}" line as `params.medicineName`
     */
    if (migratedVersion === 2) {
        console.log(
            `Migrating persistedState to version ${String(migratedVersion + 1)}`
        );

        const oldState = migratedState as { data: AppState['data'] };

        migratedState = {
            ...oldState,
            data: {
                ...oldState.data,
                logs: oldState.data.logs.map((entry) => {
                    if (!entry.metadata.notes?.includes('MIGRATE_MEDICINE')) {
                        return entry;
                    }

                    const medicineNameLine = (entry.metadata.notes ?? '')
                        .split('\n')
                        .find((line) => line.includes('NAME_'));
                    const medicineName = (medicineNameLine ?? '').replace(
                        'NAME_',
                        ''
                    );

                    return {
                        entryType: EntryType.Medicine,
                        metadata: entry.metadata,
                        params: {
                            medicineName,
                            doseType: MedicineDoseType.Piece,
                            doseValue: 1,
                        },
                    } satisfies LogEntry & {
                        entryType: EntryType.Medicine;
                    };
                }),
            },
        };
        migratedVersion = migratedVersion + 1;

        console.log(
            `Migrated persistedState to version ${String(migratedVersion)}`
        );
    }

    /**
     * Migrate v3 -> v4
     * ---
     * Changelog:
     * - No data schema change
     * - Migrate entries with "RD" (Polish: "Rozszerzanie Diety") note to EntryType.Meal
     *  - Use (starts with) "RD {MEAL_NAME}" line as `params.mealName`
     *  - Uses one line only
     */
    if (migratedVersion === 3) {
        console.log(
            `Migrating persistedState to version ${String(migratedVersion + 1)}`
        );

        const oldState = migratedState as { data: AppState['data'] };

        migratedState = {
            ...oldState,
            data: {
                ...oldState.data,
                logs: oldState.data.logs.map((entry) => {
                    if (
                        entry.entryType !== EntryType.Other ||
                        !entry.metadata.notes?.startsWith('RD ')
                    ) {
                        return entry;
                    }

                    const mealNameLine = (entry.metadata.notes ?? '')
                        .trim()
                        .split('\n')
                        .find((line) => line.startsWith('RD '));

                    const mealName = (mealNameLine ?? '').replace('RD ', '');

                    return {
                        entryType: EntryType.Meal,
                        metadata: entry.metadata,
                        params: {
                            mealName,
                        },
                    } satisfies LogEntry & {
                        entryType: EntryType.Meal;
                    };
                }),
            },
        };
        migratedVersion = migratedVersion + 1;

        console.log(
            `Migrated persistedState to version ${String(migratedVersion)}`
        );
    }

    /**
     * Migrate v4 -> v5
     * ---
     * Changelog:
     * - No data schema change
     * - Same as "v3 -> v4", but use "subtype" as data provider, not notes
     */
    if (migratedVersion === 4) {
        console.log(
            `Migrating persistedState to version ${String(migratedVersion + 1)}`
        );

        const oldState = migratedState as { data: AppState['data'] };

        migratedState = {
            ...oldState,
            data: {
                ...oldState.data,
                logs: oldState.data.logs.map((entry) => {
                    if (
                        entry.entryType !== EntryType.Other ||
                        !entry.params.subtype.startsWith('RD ')
                    ) {
                        return entry;
                    }

                    const mealNameLine = entry.params.subtype
                        .trim()
                        .split('\n')
                        .find((line) => line.startsWith('RD '));

                    const mealName = (mealNameLine ?? '').replace('RD ', '');

                    return {
                        entryType: EntryType.Meal,
                        metadata: entry.metadata,
                        params: {
                            mealName,
                        },
                    } satisfies LogEntry & {
                        entryType: EntryType.Meal;
                    };
                }),
            },
        };
        migratedVersion = migratedVersion + 1;

        console.log(
            `Migrated persistedState to version ${String(migratedVersion)}`
        );
    }

    console.log('Migrations complete');

    return migratedState as { data: AppState['data'] };
};
