import { FormValidateInput, UseFormReturnType } from '@mantine/form';
import {
    EntryMedicineVariant,
    MedicineDoseType,
} from '../../../../common/store/types/storeData.types';

export type MedicineEventFormSchema = Pick<
    EntryMedicineVariant['params'],
    'medicineName' | 'medicineActiveSubstance' | 'doseValue' | 'doseType'
>;

export const medicineEventFormDefaultValues = {
    doseType: MedicineDoseType.Piece,
    doseValue: 0,
    medicineName: '',
    medicineActiveSubstance: '',
} satisfies MedicineEventFormSchema;

export const medicineEventFormValidation = {
    medicineName(value, values) {
        if (!value && !values.medicineActiveSubstance) {
            return 'Either medicine name or medicine active substance is required';
        }
    },
    medicineActiveSubstance(value, values) {
        if (!value && !values.medicineName) {
            return 'Either medicine active substance or medicine name is required';
        }
    },
    doseValue(value) {
        if (value <= 0) {
            return 'Dose should be greater than zero';
        }
    },
} satisfies FormValidateInput<MedicineEventFormSchema>;

export const enableMedicineEventFormValidationEffects = (
    form: Pick<
        UseFormReturnType<MedicineEventFormSchema>,
        'watch' | 'validateField'
    >
) => {
    form.watch('medicineName', () => {
        form.validateField('medicineActiveSubstance');
    });
    form.watch('medicineActiveSubstance', () => {
        form.validateField('medicineName');
    });
};
