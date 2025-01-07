import { create } from 'zustand';
import { LogEntry, StoreData } from './store.types';
import { persist, devtools } from 'zustand/middleware';

interface AppState {
    data: StoreData;
    api: {
        addEntry: (entry: LogEntry) => void;
    };
    meta: {
        hasHydrated: boolean;
        setHasHydrated: (hasHydrated: boolean) => void;
    };
}

/**
 * Latest version identifier
 */
const APP_STORE_VERSION = 1;

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
                    addEntry: (entry: LogEntry) => {
                        set((state) => {
                            return {
                                data: {
                                    ...state.data,
                                    logs: [entry, ...state.data.logs],
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
                },
            }),
            {
                name: 'babyTrackerStore',
                version: APP_STORE_VERSION,
                onRehydrateStorage: (prevState) => {
                    console.log('Store rehydration starts...');

                    return (newState, error) => {
                        if (error) {
                            console.error('Store rehydration failed...', error);
                        } else {
                            console.log('Store rehydration finished...');
                        }

                        prevState.meta.setHasHydrated(true);
                    };
                },
                migrate: (persistedState, persistedVersion) => {
                    // TODO: Perform migrations here
                    if (persistedVersion === 0) {
                        return persistedState;
                    }

                    return persistedState;
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
