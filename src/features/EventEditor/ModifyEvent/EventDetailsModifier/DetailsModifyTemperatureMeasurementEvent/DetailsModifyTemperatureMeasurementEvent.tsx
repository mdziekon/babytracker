import { Box } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect } from 'react';
import { TemperatureInput } from '../../../common/components/TemperatureInput/TemperatureInput';
import {
    TemperatureMeasurementEventFormSchema,
    temperatureMeasurementEventFormValidation,
} from '../../../common/formSchemas/temperatureMeasurementEventForm.schema';

interface DetailsModifyTemperatureMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.TemperatureMeasurement };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifyTemperatureMeasurementEvent = (
    props: DetailsModifyTemperatureMeasurementEventProps
) => {
    const { event, registerEventModifier } = props;

    const {
        key: formKey,
        getInputProps,
        getValues,
        isTouched,
        validate,
    } = useForm<TemperatureMeasurementEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            measurement: event.params.measurement,
        },
        validate: temperatureMeasurementEventFormValidation,
        validateInputOnChange: true,
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'temperatureMeasurementEvent',
            (modEvent) => {
                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.TemperatureMeasurement;
                };

                if (isTouched('measurement')) {
                    modEvent2.params.measurement = getValues().measurement;
                }

                return {
                    isValid: true,
                    event: modEvent,
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
            <Box>
                <TemperatureInput
                    label="Measured temperature"
                    key={formKey('measurement')}
                    unit={event.params.unit}
                    {...getInputProps('measurement')}
                />
            </Box>
        </>
    );
};
