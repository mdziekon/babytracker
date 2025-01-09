import { Avatar, Box, Card, Text } from '@mantine/core';
import { EntryType } from '../../../common/store/store.types';
import {
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../common/utils/entryMappers';

import classes from './EventCard.module.css';

interface EventCardProps {
    eventType: EntryType;
    middle?: React.ReactNode;
    footer?: React.ReactNode;
}

export const EventCard = (props: EventCardProps) => {
    const { eventType, middle, footer } = props;
    const EntryTypeIcon = mapEntryTypeToIcon(eventType);

    return (
        <Card withBorder padding="lg" radius="md" className={classes.card}>
            <Card.Section px="xs" py="lg">
                <Avatar size={120} radius={120} mx="auto">
                    <EntryTypeIcon style={{ width: '70%', height: '70%' }} />
                </Avatar>
            </Card.Section>

            <Text fw={700} className={classes.title} mt="xs">
                {mapEntryTypeToName(eventType)}
            </Text>

            {Boolean(middle) && (
                <Box className={classes.sectionWithDivider}>{middle}</Box>
            )}

            {Boolean(footer) && (
                <Card.Section className={classes.footer}>{footer}</Card.Section>
            )}
        </Card>
    );
};
