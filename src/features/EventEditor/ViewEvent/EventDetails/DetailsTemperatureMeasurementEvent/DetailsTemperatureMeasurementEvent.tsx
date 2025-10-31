import { Group, NumberFormatter, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { IconTemperature } from '@tabler/icons-react';
import { mapTemperatureUnitToLabel } from '../../../../../common/utils/entryMappers';

interface DetailsTemperatureMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.TemperatureMeasurement };
}

export const DetailsTemperatureMeasurementEvent = (
    props: DetailsTemperatureMeasurementEventProps
) => {
    const { event } = props;

    const unitSymbol = mapTemperatureUnitToLabel(event.params.unit);

    return (
        <>
            <Group>
                <IconTemperature size={16} stroke={1.5} />
                <Text>
                    Temperature:{' '}
                    <NumberFormatter
                        thousandSeparator=" "
                        suffix={unitSymbol}
                        value={event.params.measurement}
                    />
                </Text>
            </Group>
        </>
    );
};
