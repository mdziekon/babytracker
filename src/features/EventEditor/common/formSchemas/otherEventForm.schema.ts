import { FormValidateInput, isNotEmpty } from '@mantine/form';
import { EntryOtherVariant } from '../../../../common/store/types/storeData.types';

export type OtherEventFormSchema = Pick<EntryOtherVariant['params'], 'subtype'>;

export const otherEventFormDefaultValues = {
    subtype: '',
} satisfies OtherEventFormSchema;

export const otherEventFormValidation = {
    subtype: isNotEmpty('Subtype is required'),
} satisfies FormValidateInput<OtherEventFormSchema>;
