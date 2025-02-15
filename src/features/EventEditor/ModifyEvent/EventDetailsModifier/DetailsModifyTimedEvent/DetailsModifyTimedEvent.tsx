import { Group, Text } from '@mantine/core';
import { LogEntry } from '../../../../../common/store/types/storeData.types';
import dayjs from 'dayjs';
import {
    IconCalendar,
    IconCalendarX,
    IconHourglassEmpty,
} from '@tabler/icons-react';
import { TimedLogEntryTypes } from '../../../../../common/store/store.helperTypes';
import { DateTimePicker } from '@mantine/dates';
import { FormValidateInput, isNotEmpty, useForm } from '@mantine/form';
import { useEffect } from 'react';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { DurationFromNow } from '../../../../../common/features/Duration/DurationFromNow';
import { Duration } from '../../../../../common/features/Duration/Duration';
import { DEFAULT_DATETIME_FORMAT } from '../../../../../common/utils/formatting';
import {
    isNotAfter,
    isNotInFuture,
} from '../../../../../common/utils/validators';

interface DetailsModifyTimedEventProps {
    event: LogEntry & { entryType: TimedLogEntryTypes };
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyTimedEventFormSchema {
    startedAt: Date;
    endedAt?: Date;
}

const timedEventFormValidationSchema = {
    startedAt: (value: Date | undefined, values) => {
        const validators = [
            isNotEmpty('Start date cannot be empty'),
            isNotInFuture(),
            isNotAfter(values.endedAt, {
                errorMessage: 'Start date cannot be after end date',
            }),
        ];

        for (const validator of validators) {
            const errorMessage = validator(value);
            if (errorMessage) {
                return errorMessage;
            }
        }
    },
    endedAt: (value: Date | undefined) => {
        const validators = [
            isNotEmpty('End date cannot be empty'),
            isNotInFuture(),
        ];

        for (const validator of validators) {
            const errorMessage = validator(value);
            if (errorMessage) {
                return errorMessage;
            }
        }
    },
} satisfies FormValidateInput<DetailsModifyTimedEventFormSchema>;

export const DetailsModifyTimedEvent = (
    props: DetailsModifyTimedEventProps
) => {
    const { event, registerEventModifier } = props;

    const {
        getValues,
        isTouched,
        getInputProps,
        validate,
        watch,
        validateField,
    } = useForm<DetailsModifyTimedEventFormSchema>({
        initialValues: {
            startedAt: dayjs(event.params.startedAt).toDate(),
            endedAt: dayjs(event.params.endedAt).toDate(),
        },
        validate: timedEventFormValidationSchema,
    });

    watch('startedAt', () => {
        validateField('endedAt');
    });
    watch('endedAt', () => {
        validateField('startedAt');
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'timedEvent',
            (modEvent) => {
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
                        valueFormat={DEFAULT_DATETIME_FORMAT}
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
                            valueFormat={DEFAULT_DATETIME_FORMAT}
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
