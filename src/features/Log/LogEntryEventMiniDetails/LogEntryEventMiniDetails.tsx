import { Group } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../common/store/types/storeData.types';
import { MiniDetailsBreastFeedingEvent } from './MiniDetailsBreastFeedingEvent/MiniDetailsBreastFeedingEvent';
import { MiniDetailsDiaperChangeEvent } from './MiniDetailsDiaperChangeEvent/MiniDetailsDiaperChangeEvent';
import { MiniDetailsWeightMeasurementEvent } from './MiniDetailsWeightMeasurementEvent/MiniDetailsWeightMeasurementEvent';
import { MiniDetailsFluidTimedEvent } from './MiniDetailsFluidTimedEvent/MiniDetailsFluidTimedEvent';
import { MiniDetailsEntry } from './MiniDetailsEntry/MiniDetailsEntry';
import { IconNote } from '@tabler/icons-react';
import { MiniDetailsMedicineEvent } from './MiniDetailsMedicineEvent/MiniDetailsMedicineEvent';
import { MiniDetailsDoctorsAppointmentEvent } from './MiniDetailsDoctorsAppointmentEvent/MiniDetailsDoctorsAppointmentEvent';
import { MiniDetailsOtherEvent } from './MiniDetailsOtherEvent/MiniDetailsOtherEvent';

interface LogEntryEventMiniDetailsProps {
    event: LogEntry;
}

export const LogEntryEventMiniDetails = (
    props: LogEntryEventMiniDetailsProps
) => {
    const { event } = props;

    const details: React.ReactNode[] = [];

    if (event.entryType === EntryType.BreastFeeding) {
        details.push(<MiniDetailsBreastFeedingEvent event={event} />);
    }
    if (
        event.entryType === EntryType.BottleFeeding ||
        event.entryType === EntryType.MilkPumping
    ) {
        details.push(<MiniDetailsFluidTimedEvent event={event} />);
    }
    if (event.entryType === EntryType.DiaperChange) {
        details.push(<MiniDetailsDiaperChangeEvent event={event} />);
    }
    if (event.entryType === EntryType.WeightMeasurement) {
        details.push(<MiniDetailsWeightMeasurementEvent event={event} />);
    }
    if (event.entryType === EntryType.Medicine) {
        details.push(<MiniDetailsMedicineEvent event={event} />);
    }
    if (event.entryType === EntryType.DoctorsAppointment) {
        details.push(<MiniDetailsDoctorsAppointmentEvent event={event} />);
    }
    if (event.entryType === EntryType.Other) {
        details.push(<MiniDetailsOtherEvent event={event} />);
    }

    if ((event.metadata.notes ?? '').length > 0) {
        details.push(
            <MiniDetailsEntry icon={<IconNote title="Contains notes" />} />
        );
    }

    if (!details.length) {
        return null;
    }

    return <Group gap="0.25rem">{...details}</Group>;
};
