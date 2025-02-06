import { EntryType } from '../../../../common/store/types/storeData.types';
import { LogsTable } from '../../../Log/LogsTable';
import { Card, Text } from '@mantine/core';

interface RecentEventsProps {
    eventType: EntryType;
}

export const RecentEvents = (props: RecentEventsProps) => {
    return (
        <Card withBorder padding="lg" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                <Text fw={700}>Recent events</Text>
            </Card.Section>
            <Card.Section px="md">
                {/* TODO: Fix th rendering on desktop */}
                <LogsTable
                    filters={{
                        limit: 3,
                        eventType: [props.eventType.replace('EntryType.', '')],
                    }}
                />
            </Card.Section>
        </Card>
    );
};
