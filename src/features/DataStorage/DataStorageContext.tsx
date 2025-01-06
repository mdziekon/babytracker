import { createContext } from 'react';

export enum EntryType {
    BreastFeeding = 'EntryType.BreastFeeding',
    BottleFeeding = 'EntryType.BottleFeeding',
    DiaperChange = 'EntryType.DiaperChange',
    WeightMeasurement = 'EntryType.WeightMeasurement',
}

export type EntryBreastFeedingVariant = {
    entryType: EntryType.BreastFeeding;
    params: {
        type: 'LEFT_BREAST' | 'RIGHT_BREAST' | 'BOTH';
        startedAt: DateISO8601;
        endedAt?: DateISO8601;
    };
};
export type EntryBottleFeedingVariant = {
    entryType: EntryType.BottleFeeding;
    params: {
        fluidVolume?: number;
        startedAt: DateISO8601;
        endedAt?: DateISO8601;
    };
};
export type EntryDiaperChangeVariant = {
    entryType: EntryType.DiaperChange;
    params: {
        reason: 'STOOL' | 'URINE' | 'STOOL_AND_URINE' | 'OTHER';
    };
};
export type EntryWeightMeasurementVariant = {
    entryType: EntryType.WeightMeasurement;
    params: {
        weightValue: number;
    };
};

export type EntryVariants =
    | EntryBreastFeedingVariant
    | EntryBottleFeedingVariant
    | EntryDiaperChangeVariant
    | EntryWeightMeasurementVariant;

export type DateISO8601 = string;

export type EntryMetadata = {
    createdAt: DateISO8601;
    modifications: {
        modifiedAt: DateISO8601;
    }[];
    deletedAt?: DateISO8601;
    notes?: string;
};

export type LogEntry = EntryVariants & { metadata: EntryMetadata };

export type DataStorageContextData = {
    schema: {
        version: string;
    };
    logs: LogEntry[];
};

export type DataStorageContextValue = {
    data: DataStorageContextData;
    api: {
        addEntry: (data: LogEntry) => void;
    };
};

export const DataStorageContext = createContext<
    DataStorageContextValue | undefined
>(undefined);
