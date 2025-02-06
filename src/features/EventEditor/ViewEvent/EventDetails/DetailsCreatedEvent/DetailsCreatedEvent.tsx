import { Badge, Group, Text } from '@mantine/core';
import { LogEntry } from '../../../../../common/store/types/storeData.types';
import dayjs from 'dayjs';
import { IconCalendar } from '@tabler/icons-react';
import {
    DEFAULT_DATETIME_FORMAT,
    formatDateToRelativeLabel,
} from '../../../../../common/utils/formatting';

interface DetailsCreatedEventProps {
    event: LogEntry;
}

export const DetailsCreatedEvent = (props: DetailsCreatedEventProps) => {
    const { event } = props;

    const createdAtDate = dayjs(event.metadata.createdAt);
    const createdAtBadgeLabel = formatDateToRelativeLabel(createdAtDate);
    const createdAtBadge = createdAtBadgeLabel && (
        <Badge color="gray.7">{createdAtBadgeLabel}</Badge>
    );

    return (
        <>
            <Group>
                <IconCalendar size={16} stroke={1.5} />
                <Text>
                    Date: {createdAtDate.format(DEFAULT_DATETIME_FORMAT)}{' '}
                </Text>
                {createdAtBadge}
            </Group>
        </>
    );
};
