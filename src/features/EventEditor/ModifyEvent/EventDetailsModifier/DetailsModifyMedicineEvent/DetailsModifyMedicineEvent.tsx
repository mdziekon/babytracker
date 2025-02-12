import { Box, TextInput } from '@mantine/core';
import {
    EntryType,
    LogEntry,
    MedicineDoseType,
} from '../../../../../common/store/types/storeData.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect, useState } from 'react';
import { MedicineDoseInput } from '../../../common/MedicineDoseInput/MedicineDoseInput';
import { MedicineDoseTypeInput } from '../../../common/MedicineDoseTypeInput/MedicineDoseTypeInput';
import {
    enableMedicineEventFormValidationEffects,
    MedicineEventFormSchema,
    medicineEventFormValidation,
} from '../../../common/formSchemas/medicineEventForm.schema';

interface DetailsModifyMedicineEventProps {
    event: LogEntry & { entryType: EntryType.Medicine };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifyMedicineEvent = (
    props: DetailsModifyMedicineEventProps
) => {
    const { event, registerEventModifier } = props;

    const {
        key: formKey,
        getInputProps,
        getValues,
        watch,
        validateField,
        isTouched,
        validate,
    } = useForm<MedicineEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            medicineName: event.params.medicineName,
            medicineActiveSubstance: event.params.medicineActiveSubstance,
            doseType: event.params.doseType,
            doseValue: event.params.doseValue,
        },
        validate: medicineEventFormValidation,
        validateInputOnChange: true,
    });

    const [selectedDoseType, setSelectedDoseType] = useState<MedicineDoseType>(
        event.params.doseType
    );

    watch('doseType', (input) => {
        setSelectedDoseType(input.value);
    });
    enableMedicineEventFormValidationEffects({
        watch,
        validateField,
    });

    useEffect(() => {
        const unregister = registerEventModifier(
            'medicineEvent',
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
                    entryType: EntryType.Medicine;
                };

                if (isTouched('medicineName')) {
                    modEvent2.params.medicineName = getValues().medicineName;
                }
                if (isTouched('medicineActiveSubstance')) {
                    modEvent2.params.medicineActiveSubstance =
                        getValues().medicineActiveSubstance;
                }
                if (isTouched('doseType')) {
                    modEvent2.params.doseType = getValues().doseType;
                }
                if (isTouched('doseValue')) {
                    modEvent2.params.doseValue = getValues().doseValue;
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
                <TextInput
                    label="Medicine name"
                    placeholder="Eg. Nurofen"
                    key={formKey('medicineName')}
                    {...getInputProps('medicineName')}
                />
                <TextInput
                    label="Medicine active substance"
                    placeholder="Eg. Ibuprofen"
                    mt="md"
                    key={formKey('medicineActiveSubstance')}
                    {...getInputProps('medicineActiveSubstance')}
                />
                <MedicineDoseTypeInput
                    label="Dose type"
                    required
                    mt="md"
                    key={formKey('doseType')}
                    {...getInputProps('doseType')}
                />
                <MedicineDoseInput
                    label="Medicine dose"
                    selectedDoseType={selectedDoseType}
                    required
                    mt="md"
                    key={formKey('doseValue')}
                    {...getInputProps('doseValue')}
                />
            </Box>
        </>
    );
};
