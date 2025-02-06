import { LogEntry, StoreData } from './store.types';

export interface AppState {
    data: StoreData;
    api: {
        addEntry: (entry: LogEntry) => LogEntry;
        /**
         * Insert entry, taking into account `metadata.createdAt`
         * to properly calculate position on the list
         */
        insertEntry: (entry: LogEntry) => void;
        editEntry: (entryUid: string, entry: LogEntry) => void;
        deleteEntry: (entryUid: string) => void;
    };
    meta: {
        hasHydrated: boolean;
        setHasHydrated: (hasHydrated: boolean) => void;
        mergeData: (data: StoreData) => void;
        resetData: () => void;
    };
}

/**
 * Latest version identifier
 */
export const APP_STORE_VERSION = 3;
