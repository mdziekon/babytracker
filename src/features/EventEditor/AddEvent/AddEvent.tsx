import { EntryType } from '../../../common/store/types/storeData.types';
import { AddBareTimedEvent } from './AddBareTimedEvent/AddBareTimedEvent';
import { AddBathEvent } from './AddBathEvent/AddBathEvent';
import { AddBreastFeedingEvent } from './AddBreastFeedingEvent/AddBreastFeedingEvent';
import { AddDiaperChangeEvent } from './AddDiaperChangeEvent/AddDiaperChangeEvent';
import { AddDoctorsAppointmentEvent } from './AddDoctorsAppointmentEvent/AddDoctorsAppointmentEvent';
import { AddFluidTimedEvent } from './AddFluidTimedEvent/AddFluidTimedEvent';
import { AddMealEvent } from './AddMealEvent/AddMealEvent';
import { AddMedicineEvent } from './AddMedicineEvent/AddMedicineEvent';
import { AddOtherEvent } from './AddOtherEvent/AddOtherEvent';
import { AddWeightMeasurementEvent } from './AddWeightMeasurementEvent/AddWeightMeasurementEvent';
import { AddSicknessEvent } from './AddSicknessEvent/AddSicknessEvent';
import { AddTemperatureMeasurementEvent } from './AddTemperatureMeasurementEvent/AddTemperatureMeasurementEvent';

interface AddEventProps {
    eventType: EntryType | 'unknown';
}

export const AddEvent = (props: AddEventProps) => {
    const { eventType } = props;

    if (eventType === EntryType.Bath) {
        return <AddBathEvent />;
    }
    if (eventType === EntryType.DiaperChange) {
        return <AddDiaperChangeEvent />;
    }
    if (
        eventType === EntryType.Sleep ||
        eventType === EntryType.BellyPosition ||
        eventType === EntryType.Walk
    ) {
        return <AddBareTimedEvent eventType={eventType} />;
    }
    if (eventType === EntryType.BreastFeeding) {
        return <AddBreastFeedingEvent />;
    }
    if (eventType === EntryType.WeightMeasurement) {
        return <AddWeightMeasurementEvent />;
    }
    if (
        eventType === EntryType.BottleFeeding ||
        eventType === EntryType.MilkPumping
    ) {
        return <AddFluidTimedEvent eventType={eventType} />;
    }
    if (eventType === EntryType.Medicine) {
        return <AddMedicineEvent />;
    }
    if (eventType === EntryType.DoctorsAppointment) {
        return <AddDoctorsAppointmentEvent />;
    }
    if (eventType === EntryType.Other) {
        return <AddOtherEvent />;
    }
    if (eventType === EntryType.Meal) {
        return <AddMealEvent />;
    }
    if (eventType === EntryType.Sickness) {
        return <AddSicknessEvent />;
    }
    if (eventType === EntryType.TemperatureMeasurement) {
        return <AddTemperatureMeasurementEvent />;
    }

    throw new Error(`Unknown entry type "${eventType}"`);
};
