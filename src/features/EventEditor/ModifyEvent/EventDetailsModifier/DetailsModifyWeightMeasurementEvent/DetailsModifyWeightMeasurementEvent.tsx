import { Box } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect } from 'react';
import { WeightInput } from '../../../common/WeightInput/WeightInput';
import {
    WeightMeasurementEventFormSchema,
    weightMeasurementEventFormValidation,
} from '../../../common/formSchemas/weightMeasurementEventForm.schema';

interface DetailsModifyWeightMeasurementEventProps {
    event: LogEntry & { entryType: EntryType.WeightMeasurement };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifyWeightMeasurementEvent = (
    props: DetailsModifyWeightMeasurementEventProps
) => {
    const { event, registerEventModifier } = props;

    const {
        key: formKey,
        getInputProps,
        getValues,
        isTouched,
        validate,
    } = useForm<WeightMeasurementEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            weightValue: event.params.weightValue,
        },
        validate: weightMeasurementEventFormValidation,
        validateInputOnChange: true,
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'weightMeasurementEvent',
            (modEvent, options) => {
                let isValid = true;

                if (!options?.preventValidationTrigger) {
                    isValid = !validate().hasErrors;

                    if (!isValid) {
                        return {
                            isValid,
                            event: modEvent,
                        };
                    }
                }

                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.WeightMeasurement;
                };

                if (isTouched('subtype')) {
                    modEvent2.params.weightValue = getValues().weightValue;
                }

                return {
                    isValid,
                    event: modEvent,
                };
            }
        );

        return () => {
            unregister();
        };
    }, [getValues, isTouched, registerEventModifier, validate]);

    return (
        <>
            <Box>
                <WeightInput
                    label="Measured weight"
                    key={formKey('weightValue')}
                    {...getInputProps('weightValue')}
                />
            </Box>
        </>
    );
};
