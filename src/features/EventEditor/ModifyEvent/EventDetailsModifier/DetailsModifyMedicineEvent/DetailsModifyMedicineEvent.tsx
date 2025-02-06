import { Group, InputLabel, TextInput } from '@mantine/core';
import {
    EntryMedicineVariant,
    EntryType,
    LogEntry,
    MedicineDoseType,
} from '../../../../../common/store/types/storeData.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect, useState } from 'react';
import {
    IconAbacus,
    IconMedicalCrossCircle,
    IconPillFilled,
    IconScale,
} from '@tabler/icons-react';
import { MedicineDoseInput } from '../../../common/MedicineDoseInput/MedicineDoseInput';
import { MedicineDoseTypeInput } from '../../../common/MedicineDoseTypeInput/MedicineDoseTypeInput';

interface DetailsModifyMedicineEventProps {
    event: LogEntry & { entryType: EntryType.Medicine };
    registerEventModifier: RegisterEventModifier;
}

/**
 * TODO: Missing validation, should be shared with AddMedicineEvent
 */
export const DetailsModifyMedicineEvent = (
    props: DetailsModifyMedicineEventProps
) => {
    const { event, registerEventModifier } = props;

    const {
        key: formKey,
        getInputProps,
        getValues,
        watch,
        // validateField,
        isTouched,
    } = useForm<DetailsModifyMedicineEventFormSchema>({
        mode: 'uncontrolled',
        initialValues: {
            medicineName: event.params.medicineName,
            medicineActiveSubstance: event.params.medicineActiveSubstance,
            doseType: event.params.doseType,
            doseValue: event.params.doseValue,
        },
    });

    const [selectedDoseType, setSelectedDoseType] = useState<MedicineDoseType>(
        event.params.doseType
    );

    watch('doseType', (input) => {
        setSelectedDoseType(input.value);
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

                return modEvent;
            }
        );

        return () => {
            unregister();
        };
    }, [getValues, isTouched, registerEventModifier]);

    return (
        <>
            <Group>
                <IconPillFilled size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <InputLabel htmlFor="input_medicineName">
                        Medicine name:
                    </InputLabel>
                    <TextInput
                        placeholder="Eg. Nurofen"
                        id="input_medicineName"
                        key={formKey('medicineName')}
                        {...getInputProps('medicineName')}
                    />
                </Group>
            </Group>
            <Group>
                <IconMedicalCrossCircle size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <InputLabel htmlFor="input_medicineActiveSubstance">
                        Medicine active substance:
                    </InputLabel>
                    <TextInput
                        placeholder="Eg. Ibuprofen"
                        id="input_medicineActiveSubstance"
                        key={formKey('medicineActiveSubstance')}
                        {...getInputProps('medicineActiveSubstance')}
                    />
                </Group>
            </Group>
            <Group>
                <IconScale size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <InputLabel htmlFor="input_doseType">Dose type:</InputLabel>
                    <MedicineDoseTypeInput
                        id="input_doseType"
                        required
                        key={formKey('doseType')}
                        {...getInputProps('doseType')}
                    />
                </Group>
            </Group>
            <Group>
                <IconAbacus size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <InputLabel htmlFor="input_doseValue">
                        Medicine dose:
                    </InputLabel>
                    <MedicineDoseInput
                        id="input_doseValue"
                        selectedDoseType={selectedDoseType}
                        required
                        key={formKey('doseValue')}
                        {...getInputProps('doseValue')}
                    />
                </Group>
            </Group>
        </>
    );
};

type DetailsModifyMedicineEventFormSchema = Pick<
    EntryMedicineVariant['params'],
    'medicineName' | 'medicineActiveSubstance' | 'doseValue' | 'doseType'
>;
