import { Badge, Group, rem, SegmentedControl } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { useMemo } from 'react';
import {
    IconLetterL,
    IconLetterR,
    IconQuestionMark,
} from '@tabler/icons-react';

export type FeedingType = (LogEntry & {
    entryType: EntryType.BreastFeeding;
})['params']['type'];

interface BreastSelectorProps {
    defaultOption: FeedingType;
    recommendedOption?: FeedingType;
    onOptionChange: (option: FeedingType) => void;
}

export const BreastSelector = (props: BreastSelectorProps) => {
    const options = useMemo(() => {
        return knownFeedingTypes.map((optionValue) => {
            const Icon = feedingTypeToIcon[optionValue];
            const labelTitle = feedingTypeToLabelTitle[optionValue];
            const isRecommended = props.recommendedOption === optionValue;

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
                            <Icon
                                style={{
                                    width: rem(24),
                                    height: rem(24),
                                }}
                            />
                        </Group>
                        <div>
                            {labelTitle}
                            {isRecommended && (
                                <Badge color="indigo" ml="sm">
                                    Suggested
                                </Badge>
                            )}
                        </div>
                    </Group>
                ),
            };
        });
    }, [props.recommendedOption]);

    return (
        <SegmentedControl
            fullWidth
            orientation="vertical"
            defaultValue={props.defaultOption}
            onChange={(value) => {
                if (!isKnownFeedingType(value)) {
                    throw new Error('Unknown feeding type');
                }

                props.onOptionChange(value);
            }}
            data={options}
        />
    );
};

const knownFeedingTypes = [
    'LEFT_BREAST',
    'RIGHT_BREAST',
    'UNSPECIFIED',
] satisfies FeedingType[];

const isKnownFeedingType = (value: string): value is FeedingType => {
    return (knownFeedingTypes as string[]).includes(value);
};

const feedingTypeToIcon = {
    LEFT_BREAST: IconLetterL,
    RIGHT_BREAST: IconLetterR,
    UNSPECIFIED: IconQuestionMark,
};
const feedingTypeToLabelTitle = {
    LEFT_BREAST: 'Left breast',
    RIGHT_BREAST: 'Right breast',
    UNSPECIFIED: 'Unspecified',
};
