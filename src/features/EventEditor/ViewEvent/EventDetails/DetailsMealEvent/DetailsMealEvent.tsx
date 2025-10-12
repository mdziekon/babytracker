import { Group, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { IconCarrot } from '@tabler/icons-react';

interface DetailsMealEventProps {
    event: LogEntry & { entryType: EntryType.Meal };
}

export const DetailsMealEvent = (props: DetailsMealEventProps) => {
    const { event } = props;

    return (
        <>
            <Group>
                <IconCarrot size={16} stroke={1.5} />
                <Text>Meal name: {event.params.mealName}</Text>
            </Group>
        </>
    );
};
