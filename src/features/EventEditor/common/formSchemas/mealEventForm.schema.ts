import { FormValidateInput, isNotEmpty } from '@mantine/form';
import { EntryMealVariant } from '../../../../common/store/types/storeData.types';

export type MealEventFormSchema = Pick<EntryMealVariant['params'], 'mealName'>;

export const mealEventFormDefaultValues = {
    mealName: '',
} satisfies MealEventFormSchema;

export const mealEventFormValidation = {
    mealName: isNotEmpty('Meal name is required'),
} satisfies FormValidateInput<MealEventFormSchema>;
