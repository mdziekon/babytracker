import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import { APP_STORE_VERSION, AppState } from './types/appState.types';
import { performStoreMigration } from './storeMigration.utils';

// TODO: Perform this inside React, in main component maybe with a modal informing the user about this?
void navigator.storage.persist().then((persistent) => {
    if (persistent) {
        console.log(
            'Storage will not be cleared except by explicit user action'
        );
    } else {
        console.warn(
            'Storage may be cleared by the UA under storage pressure.'
        );
    }
});

export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                data: {
                    schema: { version: APP_STORE_VERSION },
                    logs: [],
                },
                api: {
                    addEntry: (entry) => {
                        set((state) => {
                            return {
                                data: {
                                    ...state.data,
                                    logs: [entry, ...state.data.logs],
                                },
                            };
                        });

                        return entry;
                    },
                    insertEntry: (entry) => {
                        set((state) => {
                            const newEntryCreatedAt = dayjs(
                                entry.metadata.createdAt
                            );

                            // TODO: Does not handle second accuracy
                            const firstPreviousEntryIdx =
                                state.data.logs.findIndex((logEntry) =>
                                    dayjs(logEntry.metadata.createdAt).isBefore(
                                        newEntryCreatedAt
                                    )
                                );

                            if (firstPreviousEntryIdx === -1) {
                                return {
                                    data: {
                                        ...state.data,
                                        logs: [...state.data.logs, entry],
                                    },
                                };
                            }

                            // TODO: Use immer or other more efficient data storage
                            return {
                                data: {
                                    ...state.data,
                                    logs: [
                                        ...state.data.logs.slice(
                                            0,
                                            firstPreviousEntryIdx
                                        ),
                                        entry,
                                        ...state.data.logs.slice(
                                            firstPreviousEntryIdx
                                        ),
                                    ],
                                },
                            };
                        });
                    },
                    editEntry: (entryUid, entry) => {
                        set((state) => {
                            const entryIdx = state.data.logs.findIndex(
                                (logEntry) => logEntry.metadata.uid === entryUid
                            );

                            if (entryIdx === -1) {
                                return state;
                            }

                            // TODO: Use immer or other more efficient data storage
                            return {
                                data: {
                                    ...state.data,
                                    logs: [
                                        ...state.data.logs.slice(0, entryIdx),
                                        entry,
                                        ...state.data.logs.slice(entryIdx + 1),
                                    ],
                                },
                            };
                        });
                    },
                    deleteEntry: (entryUid) => {
                        set((state) => {
                            const entryIdx = state.data.logs.findIndex(
                                (logEntry) => logEntry.metadata.uid === entryUid
                            );

                            if (entryIdx === -1) {
                                return state;
                            }

                            // TODO: Use immer or other more efficient data storage
                            return {
                                data: {
                                    ...state.data,
                                    logs: [
                                        ...state.data.logs.slice(0, entryIdx),
                                        ...state.data.logs.slice(entryIdx + 1),
                                    ],
                                },
                            };
                        });
                    },
                    setBabyInfo: (babyInfo) => {
                        set((state) => {
                            return {
                                data: {
                                    ...state.data,
                                    babyInfo,
                                },
                            };
                        });
                    },
                },
                meta: {
                    hasHydrated: false,
                    setHasHydrated: (hasHydrated) => {
                        set((state) => {
                            return {
                                meta: {
                                    ...state.meta,
                                    hasHydrated,
                                },
                            };
                        });
                    },
                    mergeData: (importedData) => {
                        set((state) => {
                            const dataToMerge = (() => {
                                if (
                                    importedData.schema.version ===
                                    state.data.schema.version
                                ) {
                                    console.log(
                                        'Imported data matches version number, merging unconditionally'
                                    );

                                    return importedData;
                                }

                                console.log(
                                    `Imported data version mismatch (state: ${String(state.data.schema.version)} / imported: ${String(importedData.schema.version)}), need to perform migration first`
                                );

                                return performStoreMigration(
                                    { data: importedData },
                                    importedData.schema.version
                                ).data;
                            })();

                            /**
                             * Assume existing entries are newer,
                             * therefore filter out imported entries with same UID,
                             * as they are considered older, potentially outdated.
                             */
                            const existingUids = new Set(
                                state.data.logs.map(
                                    (entry) => entry.metadata.uid
                                )
                            );

                            const mergedLogs = [
                                ...dataToMerge.logs.filter(
                                    (entry) =>
                                        !existingUids.has(entry.metadata.uid)
                                ),
                                ...state.data.logs,
                            ].sort((leftEntry, rightEntry) => {
                                const leftCreatedAt = dayjs(
                                    leftEntry.metadata.createdAt
                                );
                                const rightCreatedAt = dayjs(
                                    rightEntry.metadata.createdAt
                                );

                                if (leftCreatedAt.isBefore(rightCreatedAt)) {
                                    return 1;
                                }
                                if (leftCreatedAt.isAfter(rightCreatedAt)) {
                                    return -1;
                                }
                                return 0;
                            });

                            return {
                                data: {
                                    ...state.data,
                                    logs: mergedLogs,
                                },
                            };
                        });
                    },
                    resetData: () => {
                        set(() => {
                            return {
                                data: {
                                    schema: { version: APP_STORE_VERSION },
                                    logs: [],
                                },
                            };
                        });
                    },
                },
            }),
            {
                name: 'babyTrackerStore',
                version: APP_STORE_VERSION,
                onRehydrateStorage: (prevState) => {
                    console.log('Store rehydration starts...');

                    return (_newState, error) => {
                        if (error) {
                            console.error('Store rehydration failed...', error);
                        } else {
                            console.log('Store rehydration finished...');
                        }

                        prevState.meta.setHasHydrated(true);
                    };
                },
                migrate: (persistedState, persistedVersion) => {
                    return performStoreMigration(
                        persistedState,
                        persistedVersion
                    );
                },
                partialize: (state) => {
                    return {
                        data: state.data,
                    };
                },
            }
        )
    )
);
