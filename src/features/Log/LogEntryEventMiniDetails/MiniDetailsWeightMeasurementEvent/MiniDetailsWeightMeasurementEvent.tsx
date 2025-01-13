import { NumberFormatter } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconWeight } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsWeightMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.WeightMeasurement };
}

export const MiniDetailsWeightMeasurementEvent = (
    props: MiniDetailsWeightMeasurementEventProps
) => {
    const { event } = props;

    return (
        <>
            <MiniDetailsEntry
                icon={<IconWeight title="Weight" />}
                title={
                    <NumberFormatter
                        thousandSeparator=" "
                        suffix="g"
                        value={event.params.weightValue}
                    />
                }
            />
        </>
    );
};
