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
    OtherEventFormSchema,
    otherEventFormValidation,
} from '../../../common/formSchemas/otherEventForm.schema';
import { useUniqueOtherSubtypes } from '../../../common/utils/useUniqueOtherSubtypes';

interface DetailsModifyOtherEventProps {
    event: LogEntry & { entryType: EntryType.Other };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifyOtherEvent = (
    props: DetailsModifyOtherEventProps
) => {
    const { event, registerEventModifier } = props;
    const allEntries = useAppStore((state) => state.data.logs);

    const { knownOtherSubtypes } = useUniqueOtherSubtypes(allEntries);

    const {
        key: formKey,
        getInputProps,
        getValues,
        isTouched,
        validate,
    } = useForm<OtherEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            subtype: event.params.subtype,
        },
        validate: otherEventFormValidation,
        validateInputOnChange: true,
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'otherEvent',
            (modEvent, options) => {
                let isValid = true;

                if (!options?.preventValidationTrigger) {
                    isValid = !validate().hasErrors;

                    if (!isValid) {
                        return {
                            isValid,
                            event: modEvent,
                        };
                    }
                }

                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.Other;
                };

                if (isTouched('subtype')) {
                    modEvent2.params.subtype = getValues().subtype;
                }

                return {
                    isValid,
                    event: modEvent,
                };
            }
        );

        return () => {
            unregister();
        };
    }, [getValues, isTouched, registerEventModifier, validate]);

    return (
        <>
            <Box>
                <Autocomplete
                    label="Subtype"
                    placeholder="Eg. diaper pack purchase"
                    key={formKey('subtype')}
                    {...getInputProps('subtype')}
                    data={knownOtherSubtypes}
                    comboboxProps={{ shadow: 'md' }}
                    maxDropdownHeight={200}
                />
            </Box>
        </>
    );
};
