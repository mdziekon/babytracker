import { useState } from 'react';
import {
    DataStorageContext,
    DataStorageContextData,
    DataStorageContextValue,
    EntryType,
} from './DataStorageContext';

export const DataStorage = (props: { children?: React.ReactNode }) => {
    const [storage, setStorage] = useState<DataStorageContextData>({
        logs: [
            {
                entryType: EntryType.BottleFeeding,
                params: {
                    startedAt: '2025-01-05T15:19:21+00:00',
                    fluidVolume: 100,
                },
                metadata: {
                    createdAt: '2025-01-05T15:19:21+00:00',
                    modifications: [],
                },
            },
            {
                entryType: EntryType.BreastFeeding,
                params: {
                    startedAt: '2025-01-01T14:19:21+00:00',
                    endedAt: '2025-01-01T14:21:21+00:00',
                    type: 'LEFT_BREAST',
                },
                metadata: {
                    createdAt: '2025-01-01T14:19:21+00:00',
                    modifications: [],
                },
            },
            {
                entryType: EntryType.DiaperChange,
                params: {
                    reason: 'STOOL_AND_URINE',
                },
                metadata: {
                    createdAt: '2024-01-01T15:19:21+00:00',
                    modifications: [],
                },
            },
            {
                entryType: EntryType.BottleFeeding,
                params: {
                    startedAt: '2024-01-01T14:19:21+00:00',
                    fluidVolume: 100,
                },
                metadata: {
                    createdAt: '2024-01-01T14:19:21+00:00',
                    modifications: [],
                },
            },
        ],
        schema: { version: '2025.01-001' },
    });

    // TODO: Try to load from persistence
    // TODO: Throw error if persistence failed because of an error
    // TODO: Initialize if persistence does not have any data

    const contextValue = {
        data: storage,
        api: {
            addEntry: (data) => {
                setStorage((prev) => {
                    return {
                        ...prev,
                        logs: [data, ...prev.logs],
                    } satisfies DataStorageContextData;
                });
            },
        },
    } satisfies DataStorageContextValue;

    return (
        <DataStorageContext value={contextValue}>
            {props.children}
        </DataStorageContext>
    );
};
