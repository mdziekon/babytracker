import { Box, NumberInput, rem, Select, TextInput } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryMedicineVariant,
    EntryType,
    MedicineDoseType,
} from '../../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useMemo, useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';
import { FormValidateInput, useForm } from '@mantine/form';
import { mapMedicineDoseTypeToSuffix } from '../../../../common/utils/entryMappers';

const eventType = EntryType.Medicine;

export const AddMedicineEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const {
        onSubmit: onFormSubmit,
        key: formKey,
        getInputProps,
        getInputNode,
        watch,
        validateField,
    } = useForm<FormSchema>({
        mode: 'uncontrolled',
        initialValues: formDefaultValues,
        validate: validation,
        validateInputOnChange: true,
    });

    const [selectedDoseType, setSelectedDoseType] = useState<MedicineDoseType>(
        formDefaultValues.doseType
    );

    watch('doseType', (input) => {
        setSelectedDoseType(input.value);
    });
    watch('medicineName', () => {
        validateField('medicineActiveSubstance');
    });
    watch('medicineActiveSubstance', () => {
        validateField('medicineName');
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
            <Select
                label="Dose type"
                placeholder="Pick dose type"
                data={Object.entries(MedicineDoseType).map(([key, value]) => {
                    return {
                        value,
                        label: key,
                    };
                })}
                mt="md"
                required
                key={formKey('doseType')}
                {...getInputProps('doseType')}
            />
            <NumberInput
                label="Medicine dose"
                rightSection={mapMedicineDoseTypeToSuffix(selectedDoseType)}
                rightSectionPointerEvents="none"
                rightSectionWidth={70}
                rightSectionProps={{
                    style: { justifyContent: 'right', paddingRight: rem(8) },
                }}
                placeholder="0"
                mt="md"
                decimalScale={0}
                max={99_999}
                clampBehavior="strict"
                thousandSeparator=" "
                allowNegative={false}
                required
                key={formKey('doseValue')}
                {...getInputProps('doseValue')}
            />
        </>
    );
    const actions = (
        <>
            <ResponsiveButton variant="primary" fullWidth type="submit">
                Add medicine dose
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

type FormSchema = Pick<
    EntryMedicineVariant['params'],
    'medicineName' | 'medicineActiveSubstance' | 'doseValue' | 'doseType'
>;

const formDefaultValues = {
    doseType: MedicineDoseType.Piece,
    doseValue: 0,
    medicineName: '',
    medicineActiveSubstance: '',
} satisfies FormSchema;

const validation = {
    medicineName(value, values) {
        if (!value && !values.medicineActiveSubstance) {
            return 'Either medicine name or medicine active substance is required';
        }
    },
    medicineActiveSubstance(value, values) {
        if (!value && !values.medicineName) {
            return 'Either medicine active substance or medicine name is required';
        }
    },
    doseValue(value) {
        if (value <= 0) {
            return 'Dose should be greater than zero';
        }
    },
} satisfies FormValidateInput<FormSchema>;
