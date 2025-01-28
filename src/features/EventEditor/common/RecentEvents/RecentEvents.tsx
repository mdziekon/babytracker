import { EntryType } from '../../../../common/store/store.types';
import { LogsTable } from '../../../Log/LogsTable';
import { Card } from '@mantine/core';

interface RecentEventsProps {
    eventType: EntryType;
}

export const RecentEvents = (props: RecentEventsProps) => {
    return (
        <Card withBorder padding="lg" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                Recent events
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
