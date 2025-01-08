import {
    IconBabyBottle,
    IconBrandMcdonalds,
    IconDiaper,
    IconMoonStars,
    IconScubaDiving,
    IconWeight,
} from '@tabler/icons-react';
import { EntryType } from '../store/store.types';

export const mapEntryTypeToIcon = (entryType: EntryType) => {
    const mapping = {
        [EntryType.BellyPosition]: IconScubaDiving,
        [EntryType.BottleFeeding]: IconBabyBottle,
        [EntryType.BreastFeeding]: IconBrandMcdonalds,
        [EntryType.DiaperChange]: IconDiaper,
        [EntryType.Sleep]: IconMoonStars,
        [EntryType.WeightMeasurement]: IconWeight,
    };

    return mapping[entryType];
};

export const mapEntryTypeToName = (entryType: EntryType) => {
    const mapping = {
        [EntryType.BellyPosition]: 'Belly Position',
        [EntryType.BottleFeeding]: 'Bottle Feeding',
        [EntryType.BreastFeeding]: 'Breast Feeding',
        [EntryType.DiaperChange]: 'Diaper Change',
        [EntryType.Sleep]: 'Sleep',
        [EntryType.WeightMeasurement]: 'Weight Measurement',
    };

    return mapping[entryType];
};
