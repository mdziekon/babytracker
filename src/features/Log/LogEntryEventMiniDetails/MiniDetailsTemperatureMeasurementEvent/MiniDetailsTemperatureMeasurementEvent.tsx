import { NumberFormatter } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';
import {
    mapEntryTypeToIcon,
    mapEntryTypeToName,
    mapTemperatureUnitToLabel,
} from '../../../../common/utils/entryMappers';

interface MiniDetailsTemperatureMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.TemperatureMeasurement };
}

export const MiniDetailsTemperatureMeasurementEvent = (
    props: MiniDetailsTemperatureMeasurementEventProps
) => {
    const { event } = props;

    const unitSymbol = mapTemperatureUnitToLabel(event.params.unit);
    const IconComponent = mapEntryTypeToIcon(event.entryType);

    return (
        <>
            <MiniDetailsEntry
                icon={
                    <IconComponent
                        title={mapEntryTypeToName(event.entryType)}
                    />
                }
                title={
                    <NumberFormatter
                        suffix={unitSymbol}
                        value={event.params.measurement}
                    />
                }
            />
        </>
    );
};
