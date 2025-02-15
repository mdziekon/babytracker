import { FormValidateInput, isNotEmpty } from '@mantine/form';
import { EntryDoctorsAppointmentVariant } from '../../../../common/store/types/storeData.types';

export type DoctorsAppointmentEventFormSchema = Pick<
    EntryDoctorsAppointmentVariant['params'],
    'visitType'
>;

export const doctorsAppointmentEventFormDefaultValues = {
    visitType: '',
} satisfies DoctorsAppointmentEventFormSchema;

export const doctorsAppointmentEventFormValidation = {
    visitType: isNotEmpty('Visit type is required'),
} satisfies FormValidateInput<DoctorsAppointmentEventFormSchema>;
