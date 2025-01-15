import { create } from 'zustand';
import { LogEntry, StoreData } from './store.types';
import { persist, devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

interface AppState {
    data: StoreData;
    api: {
        addEntry: (entry: LogEntry) => void;
        editEntry: (entryUid: string, entry: LogEntry) => void;
        deleteEntry: (entryUid: string) => void;
    };
    meta: {
        hasHydrated: boolean;
        setHasHydrated: (hasHydrated: boolean) => void;
        mergeData: (data: StoreData) => void;
    };
}

/**
 * Latest version identifier
 */
const APP_STORE_VERSION = 2;

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
                            if (
                                importedData.schema.version !==
                                state.data.schema.version
                            ) {
                                return state;
                            }

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
                                ...importedData.logs.filter(
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
                // TODO: Move to separate file?
                migrate: (persistedState, persistedVersion) => {
                    let migratedState = persistedState;
                    let migratedVersion = persistedVersion;

                    if (migratedVersion === 1) {
                        /**
                         * Changelog:
                         * - Added `data.logs[].metadata.uid`
                         */
                        console.log(
                            `Migrating persistedState to version ${String(migratedVersion + 1)}`
                        );

                        const oldState = migratedState as AppState;

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
                        migratedVersion = 1;

                        console.log(
                            `Migrated persistedState to version ${String(migratedVersion)}`
                        );
                    }

                    return migratedState;
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
