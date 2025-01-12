import { Group, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconWeight } from '@tabler/icons-react';

interface DetailsWeightMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.WeightMeasurement };
}

export const DetailsWeightMeasurementEvent = (
    props: DetailsWeightMeasurementEventProps
) => {
    const { event } = props;

    return (
        <>
            <Group>
                <IconWeight size={16} stroke={1.5} />
                <Text>Weight: {event.params.weightValue}kg</Text>
            </Group>
        </>
    );
};
