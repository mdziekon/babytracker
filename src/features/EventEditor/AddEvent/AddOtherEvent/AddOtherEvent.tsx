import { Autocomplete, Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import { EntryType } from '../../../../common/store/types/storeData.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useMemo } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';
import { useForm } from '@mantine/form';
import {
    OtherEventFormSchema,
    otherEventFormValidation,
} from '../../common/formSchemas/otherEventForm.schema';
import { useUniqueOtherSubtypes } from '../../common/utils/useUniqueOtherSubtypes';

const eventType = EntryType.Other;

export const AddOtherEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const allEntries = useAppStore((state) => state.data.logs);
    const navigate = useNavigate();

    const { knownOtherSubtypes } = useUniqueOtherSubtypes(allEntries);

    const {
        onSubmit: onFormSubmit,
        key: formKey,
        getInputProps,
        getInputNode,
    } = useForm<OtherEventFormSchema>({
        mode: 'uncontrolled',
        validate: otherEventFormValidation,
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
                label="Subtype"
                placeholder="Eg. diaper pack purchase"
                key={formKey('subtype')}
                {...getInputProps('subtype')}
                data={knownOtherSubtypes}
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
