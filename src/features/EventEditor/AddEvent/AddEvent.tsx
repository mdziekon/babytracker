import { EntryType } from '../../../common/store/store.types';
import { AddBareTimedEvent } from './AddBareTimedEvent/AddBareTimedEvent';
import { AddBathEvent } from './AddBathEvent/AddBathEvent';
import { AddBreastFeedingEvent } from './AddBreastFeedingEvent/AddBreastFeedingEvent';
import { AddDiaperChangeEvent } from './AddDiaperChangeEvent/AddDiaperChangeEvent';
import { AddFluidTimedEvent } from './AddFluidTimedEvent/AddFluidTimedEvent';
import { AddWeightMeasurementEvent } from './AddWeightMeasurementEvent/AddWeightMeasurementEvent';

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

    throw new Error(`Unknown entry type "${eventType}"`);
};
