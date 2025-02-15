import {
    IconBabyBottle,
    IconBabyCarriage,
    IconBath,
    IconBottleFilled,
    IconBrandMcdonalds,
    IconDiaper,
    IconMoonStars,
    IconPillFilled,
    IconScubaDiving,
    IconStethoscope,
    IconWeight,
} from '@tabler/icons-react';
import { EntryType, MedicineDoseType } from '../store/types/storeData.types';

export const mapEntryTypeToIcon = (entryType: EntryType) => {
    const mapping = {
        [EntryType.BellyPosition]: IconScubaDiving,
        [EntryType.BottleFeeding]: IconBabyBottle,
        [EntryType.MilkPumping]: IconBottleFilled,
        [EntryType.BreastFeeding]: IconBrandMcdonalds,
        [EntryType.DiaperChange]: IconDiaper,
        [EntryType.Sleep]: IconMoonStars,
        [EntryType.WeightMeasurement]: IconWeight,
        [EntryType.Bath]: IconBath,
        [EntryType.Walk]: IconBabyCarriage,
        [EntryType.Medicine]: IconPillFilled,
        [EntryType.DoctorsAppointment]: IconStethoscope,
    };

    return mapping[entryType];
};

export const mapEntryTypeToName = (entryType: EntryType) => {
    const mapping = {
        [EntryType.BellyPosition]: 'Belly Position',
        [EntryType.BottleFeeding]: 'Bottle Feeding',
        [EntryType.MilkPumping]: 'Milk Pumping',
        [EntryType.BreastFeeding]: 'Breast Feeding',
        [EntryType.DiaperChange]: 'Diaper Change',
        [EntryType.Sleep]: 'Sleep',
        [EntryType.WeightMeasurement]: 'Weight Measurement',
        [EntryType.Bath]: 'Bath',
        [EntryType.Walk]: 'Walk',
        [EntryType.Medicine]: 'Medicine',
        [EntryType.DoctorsAppointment]: "Doctor's Appointment",
    };

    return mapping[entryType];
};

export const mapEntryTypeToColor = (entryType: EntryType) => {
    const mapping = {
        [EntryType.BellyPosition]: 'pink',
        [EntryType.BottleFeeding]: 'cyan',
        [EntryType.MilkPumping]: 'grape',
        [EntryType.BreastFeeding]: 'lime',
        [EntryType.DiaperChange]: 'violet',
        [EntryType.Sleep]: 'indigo',
        [EntryType.WeightMeasurement]: 'green',
        [EntryType.Bath]: 'orange',
        [EntryType.Walk]: 'blue',
        [EntryType.Medicine]: 'teal',
        [EntryType.DoctorsAppointment]: 'cyan',
    };

    return mapping[entryType];
};

export const mapMedicineDoseTypeToSuffix = (doseType: MedicineDoseType) => {
    const mapping = {
        [MedicineDoseType.Piece]: 'piece(s)',
        [MedicineDoseType.Milligram]: 'mg.',
        [MedicineDoseType.Milliliter]: 'ml.',
        [MedicineDoseType.Drop]: 'drop(s)',
    };

    return mapping[doseType];
};
