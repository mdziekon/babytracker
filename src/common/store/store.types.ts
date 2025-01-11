export enum EntryType {
    BreastFeeding = 'EntryType.BreastFeeding',
    BottleFeeding = 'EntryType.BottleFeeding',
    DiaperChange = 'EntryType.DiaperChange',
    WeightMeasurement = 'EntryType.WeightMeasurement',
    Sleep = 'EntryType.Sleep',
    BellyPosition = 'EntryType.BellyPosition',
    Bath = 'EntryType.Bath',
    Walk = 'EntryType.Walk',
}

export interface EntryBreastFeedingVariant {
    entryType: EntryType.BreastFeeding;
    params: {
        type: 'LEFT_BREAST' | 'RIGHT_BREAST' | 'UNSPECIFIED';
        startedAt: DateISO8601;
        endedAt?: DateISO8601;
    };
}
export interface EntryBottleFeedingVariant {
    entryType: EntryType.BottleFeeding;
    params: {
        fluidVolume?: number;
        startedAt: DateISO8601;
        endedAt?: DateISO8601;
    };
}
export interface EntryDiaperChangeVariant {
    entryType: EntryType.DiaperChange;
    params: {
        reason: 'STOOL' | 'URINE' | 'STOOL_AND_URINE' | 'OTHER';
    };
}
export interface EntryWeightMeasurementVariant {
    entryType: EntryType.WeightMeasurement;
    params: {
        weightValue: number;
    };
}
export interface EntrySleepVariant {
    entryType: EntryType.Sleep;
    params: {
        startedAt: DateISO8601;
        endedAt?: DateISO8601;
    };
}
export interface EntryBellyPositionVariant {
    entryType: EntryType.BellyPosition;
    params: {
        startedAt: DateISO8601;
        endedAt?: DateISO8601;
    };
}
export interface EntryBathVariant {
    entryType: EntryType.Bath;
}
export interface EntryWalkVariant {
    entryType: EntryType.Walk;
    params: {
        startedAt: DateISO8601;
        endedAt?: DateISO8601;
    };
}

export type EntryVariants =
    | EntryBreastFeedingVariant
    | EntryBottleFeedingVariant
    | EntryDiaperChangeVariant
    | EntryWeightMeasurementVariant
    | EntrySleepVariant
    | EntryBellyPositionVariant
    | EntryBathVariant
    | EntryWalkVariant;

export type UUIDv4 = string;
export type DateISO8601 = string;

export interface EntryMetadata {
    uid: UUIDv4;
    createdAt: DateISO8601;
    modifications: {
        modifiedAt: DateISO8601;
    }[];
    deletedAt?: DateISO8601;
    notes?: string;
}

export type LogEntry = EntryVariants & { metadata: EntryMetadata };

export interface StoreData {
    schema: {
        version: number;
    };
    logs: LogEntry[];
}
