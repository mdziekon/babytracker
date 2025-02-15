import { Autocomplete, Box } from '@mantine/core';
import {
    EntryType,
    LogEntry,
    MedicineDoseType,
} from '../../../../../common/store/types/storeData.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect, useState } from 'react';
import { MedicineDoseInput } from '../../../common/components/MedicineDoseInput/MedicineDoseInput';
import { MedicineDoseTypeInput } from '../../../common/components/MedicineDoseTypeInput/MedicineDoseTypeInput';
import {
    enableMedicineEventFormValidationEffects,
    MedicineEventFormSchema,
    medicineEventFormValidation,
} from '../../../common/formSchemas/medicineEventForm.schema';
import { useAppStore } from '../../../../../common/store/store';
import { useUniqueMedicineKinds } from '../../../common/utils/useUniqueMedicineKinds';

interface DetailsModifyMedicineEventProps {
    event: LogEntry & { entryType: EntryType.Medicine };
    registerEventModifier: RegisterEventModifier;
}

export const DetailsModifyMedicineEvent = (
    props: DetailsModifyMedicineEventProps
) => {
    const { event, registerEventModifier } = props;
    const allEntries = useAppStore((state) => state.data.logs);

    const { knownMedicineNames, knownMedicineActiveSubstances } =
        useUniqueMedicineKinds(allEntries);

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
            (modEvent) => {
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
                    label="Medicine name"
                    placeholder="Eg. Nurofen"
                    key={formKey('medicineName')}
                    {...getInputProps('medicineName')}
                    data={knownMedicineNames}
                    comboboxProps={{ shadow: 'md' }}
                    maxDropdownHeight={200}
                />
                <Autocomplete
                    label="Medicine active substance"
                    placeholder="Eg. Ibuprofen"
                    mt="md"
                    key={formKey('medicineActiveSubstance')}
                    {...getInputProps('medicineActiveSubstance')}
                    data={knownMedicineActiveSubstances}
                    comboboxProps={{ shadow: 'md' }}
                    maxDropdownHeight={200}
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
