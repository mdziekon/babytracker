import { EntryType, LogEntry } from './store.types';

export const storeLogsExample = [
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
] satisfies LogEntry[];
