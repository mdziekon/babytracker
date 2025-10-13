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
    SicknessEventFormSchema,
    sicknessEventFormValidation,
} from '../../../common/formSchemas/sicknessEventForm.schema';
import { useUniqueSicknessDiagnoses } from '../../../common/utils/useUniqueSicknessDiagnoses';

interface DetailsModifySicknessEventProps {
    event: LogEntry & { entryType: EntryType.Sickness };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifySicknessEvent = (
    props: DetailsModifySicknessEventProps
) => {
    const { event, registerEventModifier } = props;
    const allEntries = useAppStore((state) => state.data.logs);

    const { knownDiagnoses } = useUniqueSicknessDiagnoses(allEntries);

    const {
        key: formKey,
        getInputProps,
        getValues,
        isTouched,
        validate,
    } = useForm<SicknessEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            diagnosis: event.params.diagnosis,
        },
        validate: sicknessEventFormValidation,
        validateInputOnChange: true,
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'sicknessEvent',
            (modEvent) => {
                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.Sickness;
                };

                if (isTouched('diagnosis')) {
                    modEvent2.params.diagnosis = getValues().diagnosis;
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
                    label="Diagnosis"
                    placeholder="Eg. flu, fever, etc."
                    key={formKey('diagnosis')}
                    {...getInputProps('diagnosis')}
                    data={knownDiagnoses}
                    comboboxProps={{ shadow: 'md' }}
                    maxDropdownHeight={200}
                />
            </Box>
        </>
    );
};
