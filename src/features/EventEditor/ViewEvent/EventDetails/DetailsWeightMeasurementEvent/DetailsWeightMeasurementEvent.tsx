import { Group, NumberFormatter, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
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
                <Text>
                    Weight:{' '}
                    <NumberFormatter
                        thousandSeparator=" "
                        suffix="g"
                        value={event.params.weightValue}
                    />
                </Text>
            </Group>
        </>
    );
};
