import { Autocomplete, Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import { EntryType } from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/components/EventCard/EventCard';
import { useMemo } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/components/RecentEvents/RecentEvents';
import { useForm } from '@mantine/form';
import {
    MealEventFormSchema,
    mealEventFormValidation,
} from '../../common/formSchemas/mealEventForm.schema';
import { useUniqueMealNames } from '../../common/utils/useUniqueMealNames';

const eventType = EntryType.Meal;

export const AddMealEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const allEntries = useAppStore((state) => state.data.logs);
    const navigate = useNavigate();

    const { knownMealNames } = useUniqueMealNames(allEntries);

    const {
        onSubmit: onFormSubmit,
        key: formKey,
        getInputProps,
        getInputNode,
    } = useForm<MealEventFormSchema>({
        mode: 'uncontrolled',
        validate: mealEventFormValidation,
        validateInputOnChange: true,
    });

    const handleSubmit = useMemo(() => {
        return onFormSubmit(
            (values) => {
                const newEntry = addEntry(
                    createNewEvent(() => {
                        return {
                            entryType: eventType,
                            params: {
                                ...values,
                            },
                        };
                    })
                );

                void navigate(routes.eventView(newEntry.metadata.uid), {
                    replace: true,
                });
            },
            (errors) => {
                const firstErrorPath = Object.keys(errors)[0];
                getInputNode(firstErrorPath)?.focus();
            }
        );
    }, [addEntry, onFormSubmit, navigate, getInputNode]);

    const middle = (
        <>
            <Autocomplete
                label="Meal name"
                placeholder="Eg. carrot with mashed potatoes"
                key={formKey('mealName')}
                {...getInputProps('mealName')}
                data={knownMealNames}
                comboboxProps={{ shadow: 'md' }}
                maxDropdownHeight={200}
            />
        </>
    );
    const actions = (
        <>
            <ResponsiveButton variant="primary" fullWidth type="submit">
                Add event
            </ResponsiveButton>
        </>
    );

    return (
        <form onSubmit={handleSubmit}>
            <EventCard eventType={eventType} middle={middle} footer={actions} />
            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </form>
    );
};
