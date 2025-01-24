import { Group, Text } from '@mantine/core';
import { EntryType, LogEntry } from '../../../../../common/store/store.types';
import { IconBrandMcdonalds } from '@tabler/icons-react';

interface DetailsBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
}

export const DetailsBreastFeedingEvent = (
    props: DetailsBreastFeedingEventProps
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
