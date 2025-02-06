import { Avatar, Badge, Box, Card, Center, Text } from '@mantine/core';
import { EntryType } from '../../../../common/store/types/storeData.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../../common/utils/entryMappers';

import classes from './EventCard.module.css';
import { Children } from 'react';

interface EventCardProps {
    eventType: EntryType;
    eventIconBadges?: {
        ['top-left']?: React.JSX.Element;
        ['top-right']?: React.JSX.Element;
        ['bottom-left']?: React.JSX.Element;
        ['bottom-right']?: React.JSX.Element;
    };
    middle?: React.ReactNode;
    footer?: React.ReactNode;
}

export const EventCard = (props: EventCardProps) => {
    const { eventType, eventIconBadges, middle, footer } = props;
    const EntryTypeIcon = mapEntryTypeToIcon(eventType);

    return (
        <Card withBorder padding="lg" radius="md" className={classes.card}>
            <Card.Section px="xs" py="lg">
                <Center>
                    <Box className={classes.avatarBox}>
                        <Avatar
                            color={mapEntryTypeToColor(eventType)}
                            size={120}
                            radius={120}
                            mx="auto"
                        >
                            <EntryTypeIcon
                                style={{ width: '70%', height: '70%' }}
                            />
                        </Avatar>
                        {eventIconBadges?.['top-left'] && (
                            <Badge
                                {...eventIconBadges['top-left'].props}
                                className={[
                                    classes.avatarBadgeTopLeft,
                                    eventIconBadges['top-left'].props.className,
                                ].join(' ')}
                            />
                        )}
                        {eventIconBadges?.['top-right'] && (
                            <Badge
                                {...eventIconBadges['top-right'].props}
                                className={[
                                    classes.avatarBadgeTopRight,
                                    eventIconBadges['top-right'].props
                                        .className,
                                ].join(' ')}
                            />
                        )}
                        {eventIconBadges?.['bottom-left'] && (
                            <Badge
                                {...eventIconBadges['bottom-left'].props}
                                className={[
                                    classes.avatarBadgeBottomLeft,
                                    eventIconBadges['bottom-left'].props
                                        .className,
                                ].join(' ')}
                            />
                        )}
                        {eventIconBadges?.['bottom-right'] && (
                            <Badge
                                {...eventIconBadges['bottom-right'].props}
                                className={[
                                    classes.avatarBadgeBottomRight,
                                    eventIconBadges['bottom-right'].props
                                        .className,
                                ].join(' ')}
                            />
                        )}
                    </Box>
                </Center>
            </Card.Section>

            <Text fw={700} className={classes.title} mt="xs">
                {mapEntryTypeToName(eventType)}
            </Text>

            {Children.map(middle, (child) => {
                return (
                    <Box className={classes.sectionWithDivider}>{child}</Box>
                );
            })}

            {Boolean(footer) && (
                <Card.Section className={classes.footer}>{footer}</Card.Section>
            )}
        </Card>
    );
};
