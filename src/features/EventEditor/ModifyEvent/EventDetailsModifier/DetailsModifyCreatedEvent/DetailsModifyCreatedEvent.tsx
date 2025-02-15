import { LogEntry } from '../../../../../common/store/types/storeData.types';
import dayjs from 'dayjs';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { FormValidateInput, useForm } from '@mantine/form';
import { useEffect } from 'react';
import { DateTimePicker } from '@mantine/dates';
import { DEFAULT_DATETIME_FORMAT } from '../../../../../common/utils/formatting';
import { isNotInFuture } from '../../../../../common/utils/validators';

interface DetailsModifyCreatedEventProps {
    event: LogEntry;
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyCreatedEventFormSchema {
    createdAt: Date;
}

const oneOffEventFormValidationSchema = {
    createdAt: isNotInFuture(),
} satisfies FormValidateInput<DetailsModifyCreatedEventFormSchema>;

export const DetailsModifyCreatedEvent = (
    props: DetailsModifyCreatedEventProps
) => {
    const { event, registerEventModifier } = props;

    const { getValues, isTouched, getInputProps, validate } =
        useForm<DetailsModifyCreatedEventFormSchema>({
            initialValues: {
                createdAt: dayjs(event.metadata.createdAt).toDate(),
            },
            validate: oneOffEventFormValidationSchema,
        });

    useEffect(() => {
        const unregister = registerEventModifier(
            'createdEvent',
            (modEvent) => {
                if (isTouched('createdAt')) {
                    modEvent.metadata.createdAt =
                        getValues().createdAt.toISOString();
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
            <DateTimePicker
                label="Event date"
                dropdownType="modal"
                valueFormat={DEFAULT_DATETIME_FORMAT}
                {...getInputProps('createdAt')}
            />
        </>
    );
};
