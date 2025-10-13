import { FormValidateInput, isNotEmpty } from '@mantine/form';
import { EntrySicknessVariant } from '../../../../common/store/types/storeData.types';

export type SicknessEventFormSchema = Pick<
    EntrySicknessVariant['params'],
    'diagnosis'
>;

export const sicknessEventFormDefaultValues = {
    diagnosis: '',
} satisfies SicknessEventFormSchema;

export const sicknessEventFormValidation = {
    diagnosis: isNotEmpty('Diagnosis is required'),
} satisfies FormValidateInput<SicknessEventFormSchema>;
