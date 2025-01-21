import { Group, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconBrandMcdonalds } from '@tabler/icons-react';

interface DetailsModifyBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
}

export const DetailsModifyBreastFeedingEvent = (
    props: DetailsModifyBreastFeedingEventProps
) => {
    const { event } = props;

    const whichBreast = (() => {
        switch (event.params.type) {
            case 'LEFT_BREAST':
                return 'Left breast';
            case 'RIGHT_BREAST':
                return 'Right breast';
            case 'UNSPECIFIED':
                return 'Unspecified';
        }
    })();

    return (
        <>
            <Group>
                <IconBrandMcdonalds size={16} stroke={1.5} />
                <Text>Breast: {whichBreast}</Text>
            </Group>
        </>
    );
};
