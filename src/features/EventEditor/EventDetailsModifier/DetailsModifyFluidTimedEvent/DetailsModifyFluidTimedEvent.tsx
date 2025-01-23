import { Group, NumberInput, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconBottle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent/ModifyEvent.types';
import { useEffect } from 'react';

interface DetailsModifyFluidTimedEventProps {
    event: LogEntry & {
        entryType: EntryType.BottleFeeding | EntryType.MilkPumping;
    };
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyFluidTimedEventFormSchema {
    fluidVolume: (LogEntry & {
        entryType: EntryType.BottleFeeding | EntryType.MilkPumping;
    })['params']['fluidVolume'];
}

export const DetailsModifyFluidTimedEvent = (
    props: DetailsModifyFluidTimedEventProps
) => {
    const { event, registerEventModifier } = props;

    const { getValues, isTouched, getInputProps } =
        useForm<DetailsModifyFluidTimedEventFormSchema>({
            initialValues: {
                fluidVolume: event.params.fluidVolume,
            },
        });

    useEffect(() => {
        const unregister = registerEventModifier(
            'fluidTimedEvent',
            (modEvent) => {
                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.BottleFeeding | EntryType.MilkPumping;
                };

                if (isTouched('fluidVolume')) {
                    modEvent2.params.fluidVolume = getValues().fluidVolume;
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
                <IconBottle size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <Text component="div">Volume:</Text>
                    <NumberInput
                        rightSection={'ml'}
                        rightSectionPointerEvents="none"
                        placeholder="50"
                        decimalScale={0}
                        max={9_999}
                        clampBehavior="strict"
                        thousandSeparator=" "
                        allowNegative={false}
                        {...getInputProps('fluidVolume')}
                    />
                </Group>
            </Group>
        </>
    );
};
