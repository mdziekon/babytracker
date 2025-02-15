import {
    Avatar,
    Badge,
    BadgeProps,
    Box,
    Card,
    Center,
    Text,
} from '@mantine/core';
import { EntryType } from '../../../../../common/store/types/storeData.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../../../common/utils/entryMappers';

import classes from './EventCard.module.css';
import { Children } from 'react';

interface EventCardProps {
    eventType: EntryType;
    eventIconBadges?: Partial<
        Record<EventCardBadgePosition, React.ReactElement<BadgeProps>>
    >;
    middle?: React.ReactNode;
    footer?: React.ReactNode;
}

export const EventCard = (props: EventCardProps) => {
    const { eventType, eventIconBadges, middle, footer } = props;
    const EntryTypeIcon = mapEntryTypeToIcon(eventType);

    const badges = Object.values(EventCardBadgePosition).map(
        (badgePosition) => {
            const badge = eventIconBadges?.[badgePosition];

            if (!badge) {
                return;
            }

            const verticalPosition = badgePosition.includes('Top')
                ? 'top'
                : 'bottom';
            const horizontalPosition = badgePosition.includes('Left')
                ? 'left'
                : 'right';

            return (
                <Badge
                    key={badgePosition}
                    {...badge.props}
                    style={{
                        ...badge.props.style,
                        position: 'absolute',
                        [verticalPosition]: 0,
                        [horizontalPosition]: 0,
                    }}
                />
            );
        }
    );

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
                        {badges}
                    </Box>
                </Center>
            </Card.Section>

            <Text fw={700} className={classes.title} mt="xs">
                {mapEntryTypeToName(eventType)}
            </Text>

            {Children.map(middle, (child) => {
                if (!child) {
                    return;
                }

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

export enum EventCardBadgePosition {
    TopLeft = 'EventCardBadgePosition.TopLeft',
    TopRight = 'EventCardBadgePosition.TopRight',
    BottomLeft = 'EventCardBadgePosition.BottomLeft',
    BottomRight = 'EventCardBadgePosition.BottomRight',
}
