import { NumberFormatter } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { IconTemperature } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';
import {
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

    return (
        <>
            <MiniDetailsEntry
                icon={
                    <IconTemperature
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
