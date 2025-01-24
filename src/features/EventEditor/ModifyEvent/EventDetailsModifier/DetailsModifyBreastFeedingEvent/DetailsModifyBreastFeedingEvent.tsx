import { Group, Select, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../../common/store/store.types';
import { IconBrandMcdonalds } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { RegisterEventModifier } from '../../ModifyEvent.types';
import { useEffect } from 'react';

interface DetailsModifyBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
    registerEventModifier: RegisterEventModifier;
}

interface DetailsModifyBreastFeedingEventFormSchema {
    type: (LogEntry & { entryType: EntryType.BreastFeeding })['params']['type'];
}

export const DetailsModifyBreastFeedingEvent = (
    props: DetailsModifyBreastFeedingEventProps
) => {
    const { event, registerEventModifier } = props;

    const { getValues, isTouched, getInputProps } =
        useForm<DetailsModifyBreastFeedingEventFormSchema>({
            initialValues: {
                type: event.params.type,
            },
        });

    useEffect(() => {
        const unregister = registerEventModifier(
            'breastFeedingEvent',
            (modEvent) => {
                const modEvent2 = modEvent as LogEntry & {
                    entryType: EntryType.BreastFeeding;
                };

                if (isTouched('type')) {
                    modEvent2.params.type = getValues().type;
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
                <IconBrandMcdonalds size={16} stroke={1.5} />
                <Group justify="space-between" style={{ flexGrow: 1 }}>
                    <Text component="div">Breast:</Text>
                    <Select
                        data={breastOptions}
                        maw={180}
                        {...getInputProps('type')}
                    />
                </Group>
            </Group>
        </>
    );
};

const breastOptions = [
    {
        value: 'LEFT_BREAST',
        label: 'Left breast',
    },
    {
        value: 'RIGHT_BREAST',
        label: 'Right breast',
    },
    {
        value: 'UNSPECIFIED',
        label: 'Unspecified',
    },
];
