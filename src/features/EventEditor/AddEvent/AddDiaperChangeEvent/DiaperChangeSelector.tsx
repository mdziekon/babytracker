import { Group, rem, SegmentedControl } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { IconDroplets, IconPoo, IconQuestionMark } from '@tabler/icons-react';
import { useMemo } from 'react';

export type DiaperChangeType = (LogEntry & {
    entryType: EntryType.DiaperChange;
})['params']['reason'];

interface DiaperChangeSelectorProps {
    defaultOption: DiaperChangeType;
    onOptionChange: (option: DiaperChangeType) => void;
}

export const DiaperChangeSelector = (props: DiaperChangeSelectorProps) => {
    const options = useMemo(() => {
        return knownDiaperChangeTypes.map((optionValue) => {
            const Icons = diaperChangeTypeToIcon[optionValue];
            const labelTitle = diaperChangeTypeToLabelTitle[optionValue];

            return {
                value: optionValue,
                label: (
                    <Group gap="xs">
                        <Group
                            style={{
                                width: rem(24 * 2),
                            }}
                            justify="flex-end"
                        >
                            <div>
                                {Icons.map((Icon, idx) => (
                                    <Icon
                                        key={idx}
                                        style={{
                                            width: rem(24),
                                            height: rem(24),
                                        }}
                                    />
                                ))}
                            </div>
                        </Group>
                        <div>{labelTitle}</div>
                    </Group>
                ),
            };
        });
    }, []);

    return (
        <SegmentedControl
            fullWidth
            orientation="vertical"
            defaultValue={props.defaultOption}
            onChange={(value) => {
                if (!isKnownDiaperChangeType(value)) {
                    throw new Error('Unknown diaper change type');
                }

                props.onOptionChange(value);
            }}
            data={options}
        />
    );
};

const knownDiaperChangeTypes = [
    'STOOL',
    'STOOL_AND_URINE',
    'URINE',
    'OTHER',
] satisfies DiaperChangeType[];

const isKnownDiaperChangeType = (value: string): value is DiaperChangeType => {
    return (knownDiaperChangeTypes as string[]).includes(value);
};

const diaperChangeTypeToIcon = {
    STOOL: [IconPoo],
    STOOL_AND_URINE: [IconPoo, IconDroplets],
    URINE: [IconDroplets],
    OTHER: [IconQuestionMark],
};
const diaperChangeTypeToLabelTitle = {
    STOOL: 'Stool',
    STOOL_AND_URINE: 'Stool & Urine',
    URINE: 'Urine',
    OTHER: 'Other',
};
