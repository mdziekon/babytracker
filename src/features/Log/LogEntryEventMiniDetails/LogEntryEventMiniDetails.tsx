import { Group } from '@mantine/core';
import { EntryType, LogEntry } from '../../../common/store/store.types';
import { MiniDetailsBreastFeedingEvent } from './MiniDetailsBreastFeedingEvent/MiniDetailsBreastFeedingEvent';
import { MiniDetailsDiaperChangeEvent } from './MiniDetailsDiaperChangeEvent/MiniDetailsDiaperChangeEvent';
import { MiniDetailsWeightMeasurementEvent } from './MiniDetailsWeightMeasurementEvent/MiniDetailsWeightMeasurementEvent';
import { MiniDetailsBottleFeedingEvent } from './MiniDetailsBottleFeedingEvent/MiniDetailsBottleFeedingEvent';
import { MiniDetailsEntry } from './MiniDetailsEntry/MiniDetailsEntry';
import { IconNote } from '@tabler/icons-react';

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
    if (event.entryType === EntryType.BottleFeeding) {
        details.push(<MiniDetailsBottleFeedingEvent event={event} />);
    }
    if (event.entryType === EntryType.DiaperChange) {
        details.push(<MiniDetailsDiaperChangeEvent event={event} />);
    }
    if (event.entryType === EntryType.WeightMeasurement) {
        details.push(<MiniDetailsWeightMeasurementEvent event={event} />);
    }

    if ((event.metadata.notes ?? '').length > 0) {
        details.push(
            <MiniDetailsEntry icon={<IconNote title="Contains notes" />} />
        );
    }

    return <Group gap="0.25rem">{...details}</Group>;
};
