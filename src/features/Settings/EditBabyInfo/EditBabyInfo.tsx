import { isNotEmpty, useForm } from '@mantine/form';
import { useAppStore } from '../../../common/store/store';
import { AppState } from '../../../common/store/types/appState.types';
import dayjs from 'dayjs';
import { Children, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Box, Card, Select, Text, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';
import classes from './EditBabyInfo.module.css';
import { DEFAULT_DATETIME_FORMAT } from '../../../common/utils/formatting';

export const EditBabyInfo = () => {
    const currentBabyInfo = useAppStore((store) => store.data.babyInfo);
    const setBabyInfo = useAppStore((store) => store.api.setBabyInfo);

    const navigate = useNavigate();

    const {
        onSubmit: onFormSubmit,
        key: formKey,
        getInputProps,
        getInputNode,
    } = useForm<EditBabyInfoSchema>({
        mode: 'uncontrolled',
        initialValues: {
            ...defaultInitialValues,
            ...(currentBabyInfo
                ? {
                      ...currentBabyInfo,
                      dateOfBirth: dayjs(currentBabyInfo.dateOfBirth).toDate(),
                  }
                : {}),
        },
        validate: validation,
        validateInputOnChange: true,
    });

    const handleSubmit = useMemo(() => {
        return onFormSubmit(
            (values) => {
                setBabyInfo({
                    ...values,
                    dateOfBirth: values.dateOfBirth.toISOString(),
                });

                void navigate(-1);
            },
            (errors) => {
                const firstErrorPath = Object.keys(errors)[0];
                getInputNode(firstErrorPath)?.focus();
            }
        );
    }, [getInputNode, navigate, onFormSubmit, setBabyInfo]);

    const middle = (
        <>
            <TextInput
                label="Name of your child"
                placeholder="Eg. John"
                key={formKey('name')}
                {...getInputProps('name')}
                required
            />
            <Select
                label="Child's gender"
                placeholder="Pick gender"
                mt="md"
                allowDeselect={false}
                data={[
                    {
                        value: 'MALE',
                        label: 'Male',
                    },
                    {
                        value: 'FEMALE',
                        label: 'Female',
                    },
                ]}
                key={formKey('gender')}
                {...getInputProps('gender')}
                required
            />
            <DateTimePicker
                label="Date of birth"
                mt="md"
                valueFormat={DEFAULT_DATETIME_FORMAT}
                key={formKey('dateOfBirth')}
                {...getInputProps('dateOfBirth')}
                required
            />
        </>
    );
    const footer = (
        <>
            <ResponsiveButton variant="primary" fullWidth type="submit">
                Save data
            </ResponsiveButton>
        </>
    );

    return (
        <form onSubmit={handleSubmit}>
            <Card withBorder padding="lg" radius="md" className={classes.card}>
                <Text fw={700} className={classes.title} mt="xs">
                    Edit info about your child
                </Text>

                {Children.map(middle, (child) => {
                    return (
                        <Box className={classes.sectionWithDivider}>
                            {child}
                        </Box>
                    );
                })}

                {Boolean(footer) && (
                    <Card.Section className={classes.footer}>
                        {footer}
                    </Card.Section>
                )}
            </Card>
        </form>
    );
};

type EditBabyInfoSchema = Omit<
    NonNullable<AppState['data']['babyInfo']>,
    'dateOfBirth'
> & {
    dateOfBirth: Date;
};

const defaultInitialValues = {
    name: '',
    gender: 'MALE',
    dateOfBirth: new Date(),
} satisfies EditBabyInfoSchema;

const validation = {
    name: isNotEmpty('Please provide name'),
    gender: isNotEmpty('Please provide gender'),
    dateOfBirth: isNotEmpty('Please provide date of birth'),
} satisfies Record<keyof EditBabyInfoSchema, unknown>;
