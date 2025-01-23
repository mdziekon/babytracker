import { useEffect, useState } from 'react';
import {
    PillsInput,
    Pill,
    Combobox,
    CheckIcon,
    Group,
    useCombobox,
    Text,
} from '@mantine/core';
import { EntryType } from '../../../common/store/store.types';
import { mapEntryTypeToIcon } from '../../../common/utils/entryMappers';

interface LogTypeComboboxProps {
    onChange: (value: string[]) => void;
}

export const LogTypeCombobox = (props: LogTypeComboboxProps) => {
    const { onChange } = props;

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
        },
        onDropdownOpen: () => {
            combobox.updateSelectedOptionIndex('active');
        },
    });

    const [value, setValue] = useState<string[]>([]);

    useEffect(() => {
        onChange(value);
    }, [onChange, value]);

    const handleValueSelect = (value: string) => {
        setValue((current) =>
            current.includes(value)
                ? current.filter((currentEntry) => currentEntry !== value)
                : [...current, value]
        );
    };

    const handleValueRemove = (value: string) => {
        setValue((current) =>
            current.filter((currentEntry) => currentEntry !== value)
        );
    };

    const values = value.map((item) => {
        const Icon = mapEntryTypeToIcon(`EntryType.${item}` as EntryType);

        return (
            <Pill
                key={item}
                withRemoveButton
                onRemove={() => {
                    handleValueRemove(item);
                }}
            >
                <Icon size={12} /> {item}
            </Pill>
        );
    });

    const options = availableOptions.map((item) => {
        const Icon = mapEntryTypeToIcon(`EntryType.${item}` as EntryType);

        return (
            <Combobox.Option
                value={item}
                key={item}
                active={value.includes(item)}
            >
                <Group gap="sm">
                    <CheckIcon
                        size={12}
                        visibility={value.includes(item) ? undefined : 'hidden'}
                    />
                    <span>
                        <Icon size={16} /> {item}
                    </span>
                </Group>
            </Combobox.Option>
        );
    });

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
            <Combobox.DropdownTarget>
                <PillsInput
                    label="Event type"
                    onClick={() => {
                        combobox.openDropdown();
                    }}
                >
                    <Pill.Group>
                        {values}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                onFocus={() => {
                                    combobox.openDropdown();
                                }}
                                onBlur={() => {
                                    combobox.closeDropdown();
                                }}
                                component="span"
                                children={
                                    values.length > 0 ? (
                                        ''
                                    ) : (
                                        <Text c="dimmed">
                                            Select type(s) to filter
                                        </Text>
                                    )
                                }
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options mah={150} style={{ overflowY: 'auto' }}>
                    {options.length > 0 ? (
                        options
                    ) : (
                        <Combobox.Empty>Nothing found...</Combobox.Empty>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

const availableOptions = Object.values(EntryType).map((entryType) =>
    entryType.replace('EntryType.', '')
);
