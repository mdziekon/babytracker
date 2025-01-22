import { Group, NumberInput, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent/ModifyEvent.types';
import { useEffect } from 'react';
import { IconWeight } from '@tabler/icons-react';

interface DetailsModifyWeightMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.WeightMeasurement };
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyWeightMeasurementEventFormSchema {
    weightValue: (LogEntry & {
        entryType: EntryType.WeightMeasurement;
    })['params']['weightValue'];
}

export const DetailsModifyWeightMeasurementEvent = (
    props: DetailsModifyWeightMeasurementEventProps
) => {
    const { event, registerEventModifier } = props;

    const { getValues, isTouched, getInputProps } =
        useForm<DetailsModifyWeightMeasurementEventFormSchema>({
            initialValues: {
                weightValue: event.params.weightValue,
            },
        });

    useEffect(() => {
        const unregister = registerEventModifier(
            'weightMeasurementEvent',
            (modEvent) => {
                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.WeightMeasurement;
                };

                if (isTouched('weightValue')) {
                    modEvent2.params.weightValue = getValues().weightValue;
                }

                return modEvent;
            }
        );

        return () => {
            unregister();
        };
    }, [getValues, isTouched, registerEventModifier]);

    return (
        <>
            <Group>
                <IconWeight size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <Text component="div">Weight:</Text>
                    <NumberInput
                        rightSection={'g'}
                        rightSectionPointerEvents="none"
                        placeholder="5000"
                        mt="md"
                        decimalScale={0}
                        max={99_999}
                        clampBehavior="strict"
                        thousandSeparator=" "
                        allowNegative={false}
                        {...getInputProps('weightValue')}
                    />
                </Group>
            </Group>
        </>
    );
};
