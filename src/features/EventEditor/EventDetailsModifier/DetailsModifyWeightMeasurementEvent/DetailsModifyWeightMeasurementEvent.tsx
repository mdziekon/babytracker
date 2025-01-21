import { Group, NumberFormatter, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconWeight } from '@tabler/icons-react';

interface DetailsModifyWeightMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.WeightMeasurement };
}

export const DetailsModifyWeightMeasurementEvent = (
    props: DetailsModifyWeightMeasurementEventProps
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
