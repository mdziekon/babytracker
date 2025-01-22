import { Group, Text } from '@mantine/core';
import { LogEntry } from '../../../../common/store/store.types';
import dayjs from 'dayjs';
import {
    IconCalendar,
    IconCalendarX,
    IconHourglassEmpty,
} from '@tabler/icons-react';
import { TimedLogEntryTypes } from '../../../../common/store/store.helperTypes';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { RegisterEventModifier } from '../../ModifyEvent/ModifyEvent.types';
import { DurationFromNow } from '../../../../common/features/Duration/DurationFromNow';
import { Duration } from '../../../../common/features/Duration/Duration';

interface DetailsModifyTimedEventProps {
    event: LogEntry & { entryType: TimedLogEntryTypes };
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyTimedEventFormSchema {
    startedAt: Date;
    endedAt?: Date;
}

export const DetailsModifyTimedEvent = (
    props: DetailsModifyTimedEventProps
) => {
    const { event, registerEventModifier } = props;

    const { getValues, isTouched, getInputProps } =
        useForm<DetailsModifyTimedEventFormSchema>({
            initialValues: {
                startedAt: dayjs(event.params.startedAt).toDate(),
                endedAt: dayjs(event.params.endedAt).toDate(),
            },
            // TODO: Add "before" & "after" validators
        });

    useEffect(() => {
        const unregister = registerEventModifier('timedEvent', (modEvent) => {
            const modEvent2 = modEvent as LogEntry & {
                entryType: TimedLogEntryTypes;
            };

            if (isTouched('startedAt')) {
                modEvent2.params.startedAt =
                    getValues().startedAt.toISOString();

                modEvent2.metadata.createdAt = modEvent2.params.startedAt;
            }
            if (isTouched('endedAt')) {
                const endedAtValue = getValues().endedAt;

                modEvent2.params.endedAt = endedAtValue
                    ? endedAtValue.toISOString()
                    : undefined;
            }

            return modEvent;
        });

        return () => {
            unregister();
        };
    }, [getValues, isTouched, registerEventModifier]);

    const formValues = getValues();

    const startedAtDate = dayjs(formValues.startedAt);
    const endedAtDate = dayjs(formValues.endedAt ?? NaN);

    const finalDuration = endedAtDate.isValid()
        ? dayjs.duration(endedAtDate.diff(startedAtDate))
        : undefined;

    return (
        <>
            <Group>
                <IconCalendar size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <Text component="div">Started:</Text>
                    <DateTimePicker
                        dropdownType="modal"
                        valueFormat="YYYY-MM-DD HH:mm"
                        {...getInputProps('startedAt')}
                    />
                </Group>
            </Group>
            {endedAtDate.isValid() && (
                <Group>
                    <IconCalendarX size={16} stroke={1.5} />
                    <Group justify="space-between" style={{ flexGrow: 1 }}>
                        <Text component="div">Finished:</Text>
                        <DateTimePicker
                            dropdownType="modal"
                            valueFormat="YYYY-MM-DD HH:mm"
                            {...getInputProps('endedAt')}
                        />
                    </Group>
                </Group>
            )}
            {!endedAtDate.isValid() && (
                <Group>
                    <IconHourglassEmpty size={16} stroke={1.5} />
                    <Text>
                        Duration: <DurationFromNow startedAt={startedAtDate} />
                    </Text>
                </Group>
            )}
            {finalDuration && (
                <Group>
                    <IconHourglassEmpty size={16} stroke={1.5} />
                    <Text>
                        Duration: <Duration duration={finalDuration} />
                    </Text>
                </Group>
            )}
        </>
    );
};
