import { Autocomplete, Box } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect } from 'react';
import { useAppStore } from '../../../../../common/store/store';
import {
    MealEventFormSchema,
    mealEventFormValidation,
} from '../../../common/formSchemas/mealEventForm.schema';
import { useUniqueMealNames } from '../../../common/utils/useUniqueMealNames';

interface DetailsModifyMealEventProps {
    event: LogEntry & { entryType: EntryType.Meal };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifyMealEvent = (props: DetailsModifyMealEventProps) => {
    const { event, registerEventModifier } = props;
    const allEntries = useAppStore((state) => state.data.logs);

    const { knownMealNames } = useUniqueMealNames(allEntries);

    const {
        key: formKey,
        getInputProps,
        getValues,
        isTouched,
        validate,
    } = useForm<MealEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            mealName: event.params.mealName,
        },
        validate: mealEventFormValidation,
        validateInputOnChange: true,
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'mealEvent',
            (modEvent) => {
                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.Meal;
                };

                if (isTouched('mealName')) {
                    modEvent2.params.mealName = getValues().mealName;
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
                <Autocomplete
                    label="Meal name"
                    placeholder="Eg. carrot with mashed potatoes"
                    key={formKey('mealName')}
                    {...getInputProps('mealName')}
                    data={knownMealNames}
                    comboboxProps={{ shadow: 'md' }}
                    maxDropdownHeight={200}
                />
            </Box>
        </>
    );
};
