import { FormValidateInput, isInRange } from '@mantine/form';
import { EntryWeightMeasurementVariant } from '../../../../common/store/types/storeData.types';

export type WeightMeasurementEventFormSchema = Pick<
    EntryWeightMeasurementVariant['params'],
    'weightValue'
>;

export const weightMeasurementEventFormDefaultValues = {
    weightValue: 0,
} satisfies WeightMeasurementEventFormSchema;

export const weightMeasurementEventFormValidation = {
    weightValue: isInRange({ min: 1 }, 'Weight needs to be a positive number'),
} satisfies FormValidateInput<WeightMeasurementEventFormSchema>;
