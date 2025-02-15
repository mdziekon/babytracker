import { EntryType } from '../../../../common/store/types/storeData.types';
import { LogsTable } from '../../../Log/LogsTable';
import { Card, Text } from '@mantine/core';

interface RecentEventsProps {
    eventType: EntryType;
    eventsLimit?: number;
}

export const RecentEvents = (props: RecentEventsProps) => {
    const { eventType, eventsLimit = 3 } = props;

    return (
        <Card withBorder padding="lg" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                <Text fw={700}>Recent events</Text>
            </Card.Section>
            <Card.Section px="md">
                <LogsTable
                    filters={{
                        limit: eventsLimit,
                        eventType: [eventType.replace('EntryType.', '')],
                    }}
                />
            </Card.Section>
        </Card>
    );
};
