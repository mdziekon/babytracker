import { Group, NumberFormatter, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import {
    mapEntryTypeToIcon,
    mapTemperatureUnitToLabel,
} from '../../../../../common/utils/entryMappers';

interface DetailsTemperatureMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.TemperatureMeasurement };
}

export const DetailsTemperatureMeasurementEvent = (
    props: DetailsTemperatureMeasurementEventProps
) => {
    const { event } = props;

    const unitSymbol = mapTemperatureUnitToLabel(event.params.unit);
    const IconComponent = mapEntryTypeToIcon(event.entryType);

    return (
        <>
            <Group>
                <IconComponent size={16} stroke={1.5} />
                <Text>
                    Temperature:{' '}
                    <NumberFormatter
                        suffix={unitSymbol}
                        value={event.params.measurement}
                    />
                </Text>
            </Group>
        </>
    );
};
