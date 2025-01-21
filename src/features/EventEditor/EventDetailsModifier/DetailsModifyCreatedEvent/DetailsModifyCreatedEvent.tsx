import { Badge, Group, Text } from '@mantine/core';
import { LogEntry } from '../../../../common/store/store.types';
import dayjs from 'dayjs';
import { IconCalendar } from '@tabler/icons-react';
import { formatDateToRelativeLabel } from '../../../../common/utils/formatting';

interface DetailsModifyCreatedEventProps {
    event: LogEntry;
}

export const DetailsModifyCreatedEvent = (
    props: DetailsModifyCreatedEventProps
) => {
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
                <Text>Date: {createdAtDate.format('YYYY-MM-DD HH:mm')} </Text>
                {createdAtBadge}
            </Group>
        </>
    );
};
