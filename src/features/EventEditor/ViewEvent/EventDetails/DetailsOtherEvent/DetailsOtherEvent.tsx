import { Group, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { IconFileUnknown } from '@tabler/icons-react';

interface DetailsOtherEventProps {
    event: LogEntry & { entryType: EntryType.Other };
}

export const DetailsOtherEvent = (props: DetailsOtherEventProps) => {
    const { event } = props;

    return (
        <>
            <Group>
                <IconFileUnknown size={16} stroke={1.5} />
                <Text>Subtype: {event.params.subtype}</Text>
            </Group>
        </>
    );
};
