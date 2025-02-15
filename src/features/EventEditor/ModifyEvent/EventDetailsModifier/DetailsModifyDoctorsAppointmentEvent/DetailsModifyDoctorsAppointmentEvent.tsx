import { Autocomplete, Box } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect } from 'react';
import { useAppStore } from '../../../../../common/store/store';
import { useUniqueVisitTypes } from '../../../common/utils/useUniqueVisitTypes';
import {
    DoctorsAppointmentEventFormSchema,
    doctorsAppointmentEventFormValidation,
} from '../../../common/formSchemas/doctorsAppointmentEventForm.schema';

interface DetailsModifyDoctorsAppointmentEventProps {
    event: LogEntry & { entryType: EntryType.DoctorsAppointment };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifyDoctorsAppointmentEvent = (
    props: DetailsModifyDoctorsAppointmentEventProps
) => {
    const { event, registerEventModifier } = props;
    const allEntries = useAppStore((state) => state.data.logs);

    const { knownVisitTypes } = useUniqueVisitTypes(allEntries);

    const {
        key: formKey,
        getInputProps,
        getValues,
        isTouched,
        validate,
    } = useForm<DoctorsAppointmentEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            visitType: event.params.visitType,
        },
        validate: doctorsAppointmentEventFormValidation,
        validateInputOnChange: true,
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'doctorsAppointmentEvent',
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
                    entryType: EntryType.DoctorsAppointment;
                };

                if (isTouched('visitType')) {
                    modEvent2.params.visitType = getValues().visitType;
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
                    label="Visit type"
                    placeholder="Eg. Vaccination"
                    key={formKey('visitType')}
                    {...getInputProps('visitType')}
                    data={knownVisitTypes}
                    comboboxProps={{ shadow: 'md' }}
                    maxDropdownHeight={200}
                />
            </Box>
        </>
    );
};
