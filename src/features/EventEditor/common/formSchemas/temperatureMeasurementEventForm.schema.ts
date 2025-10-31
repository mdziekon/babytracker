import { FormValidateInput, isInRange } from '@mantine/form';
import { EntryTemperatureMeasurementVariant } from '../../../../common/store/types/storeData.types';

/**
 * Note: Since unit is hardcoded for now, we explicitly DO NOT include `unit` property
 * in this form schema.
 */
export type TemperatureMeasurementEventFormSchema = Pick<
    EntryTemperatureMeasurementVariant['params'],
    'measurement'
>;

export const temperatureMeasurementEventFormDefaultValues = {
    measurement: 0,
} satisfies TemperatureMeasurementEventFormSchema;

export const temperatureMeasurementEventFormValidation = {
    // TODO: This validator needs to be changed when other units get support eventually
    measurement: isInRange(
        { min: 25, max: 45 },
        'Temperature must be between 25 and 45 degrees Celsius'
    ),
} satisfies FormValidateInput<TemperatureMeasurementEventFormSchema>;
