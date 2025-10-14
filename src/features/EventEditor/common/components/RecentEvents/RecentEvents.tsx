import { EntryType } from '../../../../../common/store/types/storeData.types';
import { LogFiltersState } from '../../../../Log/LogFilters/LogFilters';
import { LogsTable } from '../../../../Log/LogsTable';
import { Card, Text } from '@mantine/core';

interface RecentEventsProps {
    eventType: EntryType;
    eventsLimit?: number;
    customFilterHandler?: LogFiltersState['customFilterHandler'];
}

export const RecentEvents = (props: RecentEventsProps) => {
    const { eventType, eventsLimit = 3, customFilterHandler } = props;

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
                        customFilterHandler,
                    }}
                />
            </Card.Section>
        </Card>
    );
};
