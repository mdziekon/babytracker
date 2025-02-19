import { Group, Select, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { IconPoo } from '@tabler/icons-react';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface DetailsModifyDiaperChangeEventProps {
    event: LogEntry & { entryType: EntryType.DiaperChange };
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyDiaperChangeEventFormSchema {
    reason: (LogEntry & {
        entryType: EntryType.DiaperChange;
    })['params']['reason'];
}

export const DetailsModifyDiaperChangeEvent = (
    props: DetailsModifyDiaperChangeEventProps
) => {
    const { event, registerEventModifier } = props;

    const { getValues, isTouched, getInputProps, validate } =
        useForm<DetailsModifyDiaperChangeEventFormSchema>({
            initialValues: {
                reason: event.params.reason,
            },
        });

    useEffect(() => {
        const unregister = registerEventModifier(
            'diaperChangeEvent',
            (modEvent) => {
                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.DiaperChange;
                };

                if (isTouched('reason')) {
                    modEvent2.params.reason = getValues().reason;
                }

                return {
                    event: modEvent,
                    isValid: true,
                };
            },
            validate
        );

        return () => {
            unregister();
        };
    }, [getValues, isTouched, registerEventModifier, validate]);

    return (
        <>
            <Group>
                <IconPoo size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <Text component="div">Reason:</Text>
                    <Select
                        data={reasonOptions}
                        maw={180}
                        {...getInputProps('reason')}
                    />
                </Group>
            </Group>
        </>
    );
};

const reasonOptions = [
    {
        value: 'STOOL',
        label: 'Stool',
    },
    {
        value: 'STOOL_AND_URINE',
        label: 'Stool & Urine',
    },
    {
        value: 'URINE',
        label: 'Urine',
    },
    {
        value: 'OTHER',
        label: 'Other',
    },
];
