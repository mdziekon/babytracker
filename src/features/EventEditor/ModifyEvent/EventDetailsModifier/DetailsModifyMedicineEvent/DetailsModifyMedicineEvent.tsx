import {
    Group,
    InputLabel,
    NumberInput,
    rem,
    Select,
    TextInput,
} from '@mantine/core';
import {
    EntryMedicineVariant,
    EntryType,
    LogEntry,
    MedicineDoseType,
} from '../../../../../common/store/store.types';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect, useState } from 'react';
import {
    IconAbacus,
    IconMedicalCrossCircle,
    IconPillFilled,
    IconScale,
} from '@tabler/icons-react';
import { mapMedicineDoseTypeToSuffix } from '../../../../../common/utils/entryMappers';

interface DetailsModifyMedicineEventProps {
    event: LogEntry & { entryType: EntryType.Medicine };
    registerEventModifier: RegisterEventModifier;
}

/**
 * TODO: Missing validation, should be shared with AddMedicineEvent
 * TODO: Share inputs props with AddMedicineEvent
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
                    <Select
                        id="input_doseType"
                        placeholder="Pick dose type"
                        data={Object.entries(MedicineDoseType).map(
                            ([key, value]) => {
                                return {
                                    value,
                                    label: key,
                                };
                            }
                        )}
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
                    <NumberInput
                        id="input_doseValue"
                        rightSection={mapMedicineDoseTypeToSuffix(
                            selectedDoseType
                        )}
                        rightSectionPointerEvents="none"
                        rightSectionWidth={70}
                        rightSectionProps={{
                            style: {
                                justifyContent: 'right',
                                paddingRight: rem(8),
                            },
                        }}
                        placeholder="0"
                        decimalScale={0}
                        max={99_999}
                        clampBehavior="strict"
                        thousandSeparator=" "
                        allowNegative={false}
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
