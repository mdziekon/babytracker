import {
    IconBabyBottle,
    IconBabyCarriage,
    IconBath,
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
        [EntryType.Bath]: IconBath,
        [EntryType.Walk]: IconBabyCarriage,
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
        [EntryType.Bath]: 'Bath',
        [EntryType.Walk]: 'Walk',
    };

    return mapping[entryType];
};

export const mapEntryTypeToColor = (entryType: EntryType) => {
    const mapping = {
        [EntryType.BellyPosition]: 'pink',
        [EntryType.BottleFeeding]: 'cyan',
        [EntryType.BreastFeeding]: 'lime',
        [EntryType.DiaperChange]: 'violet',
        [EntryType.Sleep]: 'indigo',
        [EntryType.WeightMeasurement]: 'green',
        [EntryType.Bath]: 'orange',
        [EntryType.Walk]: 'blue',
    };

    return mapping[entryType];
};
