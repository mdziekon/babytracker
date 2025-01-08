import { Avatar, Paper, Text } from '@mantine/core';
import { EntryType } from '../../../common/store/store.types';
import {
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../common/utils/entryMappers';
import { PropsWithChildren } from 'react';

interface EventCardOwnProps {
    eventType: EntryType;
}
type EventCardProps = PropsWithChildren<EventCardOwnProps>;

export const EventCard = (props: EventCardProps) => {
    const { eventType, children } = props;
    const EntryTypeIcon = mapEntryTypeToIcon(eventType);

    return (
        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar size={120} radius={120} mx="auto">
                <EntryTypeIcon style={{ width: '70%', height: '70%' }} />
            </Avatar>
            <Text ta="center" fz="lg" fw={500} mt="md">
                {mapEntryTypeToName(eventType)}
            </Text>

            {children}
        </Paper>
    );
};
