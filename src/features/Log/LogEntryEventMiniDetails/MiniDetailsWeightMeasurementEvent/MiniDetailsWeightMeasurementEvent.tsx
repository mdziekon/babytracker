import {
    Group,
    NumberFormatter,
    parseThemeColor,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconWeight } from '@tabler/icons-react';

interface MiniDetailsWeightMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.WeightMeasurement };
}

export const MiniDetailsWeightMeasurementEvent = (
    props: MiniDetailsWeightMeasurementEventProps
) => {
    const { event } = props;
    const theme = useMantineTheme();

    return (
        <>
            <Group gap="0.25rem">
                <IconWeight
                    size={16}
                    stroke={1.5}
                    color={parseThemeColor({ color: 'dark.2', theme }).value}
                />
                <Text c="dark.2">
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
