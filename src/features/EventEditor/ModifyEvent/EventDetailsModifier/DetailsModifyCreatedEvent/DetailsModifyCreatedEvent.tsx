import { Group, Text } from '@mantine/core';
import { LogEntry } from '../../../../../common/store/store.types';
import dayjs from 'dayjs';
import { IconCalendar } from '@tabler/icons-react';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { DateTimePicker } from '@mantine/dates';
import { DEFAULT_DATETIME_FORMAT } from '../../../../../common/utils/formatting';

interface DetailsModifyCreatedEventProps {
    event: LogEntry;
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyCreatedEventFormSchema {
    createdAt: Date;
}

export const DetailsModifyCreatedEvent = (
    props: DetailsModifyCreatedEventProps
) => {
    const { event, registerEventModifier } = props;

    const { getValues, isTouched, getInputProps } =
        useForm<DetailsModifyCreatedEventFormSchema>({
            initialValues: {
                createdAt: dayjs(event.metadata.createdAt).toDate(),
            },
        });

    useEffect(() => {
        const unregister = registerEventModifier('createdEvent', (modEvent) => {
            if (isTouched('createdAt')) {
                modEvent.metadata.createdAt =
                    getValues().createdAt.toISOString();
            }

            return modEvent;
        });

        return () => {
            unregister();
        };
    }, [getValues, isTouched, registerEventModifier]);

    return (
        <>
            <Group>
                <IconCalendar size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <Text component="div">Date:</Text>
                    <DateTimePicker
                        dropdownType="modal"
                        valueFormat={DEFAULT_DATETIME_FORMAT}
                        {...getInputProps('createdAt')}
                    />
                </Group>
            </Group>
        </>
    );
};
