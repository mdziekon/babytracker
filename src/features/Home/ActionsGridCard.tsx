import { Badge, Card, Group, Text } from '@mantine/core';
import classes from './ActionsGridCard.module.css';
import { NavLink } from 'react-router';
import { EntryType } from '../../common/store/types/storeData.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../common/utils/entryMappers';
import { TimedLogEntries } from '../../common/store/store.helperTypes';
import { routes } from '../../common/routes';
import {
    ActionProps,
    ActionsGrid,
} from '../../common/features/ActionsGrid/ActionsGrid';

interface ActionsGridCardProps {
    actions: (
        | {
              entryType: EntryType;
          }
        | undefined
    )[];
    actionsInProgress: TimedLogEntries[];
}

export function ActionsGridCard(props: ActionsGridCardProps) {
    const { actions, actionsInProgress } = props;

    const hasActionsInProgress = actionsInProgress.length > 0;
    const actionsInProgressByType = actionsInProgress.reduce<
        Record<EntryType, TimedLogEntries>
    >(
        (grouping, action) => {
            grouping[action.entryType] = action;

            return grouping;
        },
        {} as Record<EntryType, TimedLogEntries>
    );

    const actionElements = actions.map((action) => {
        if (!action) {
            return;
        }

        const title = mapEntryTypeToName(action.entryType);
        const EntryTypeIcon = mapEntryTypeToIcon(action.entryType);
        const iconColor = mapEntryTypeToColor(action.entryType);

        const inProgressAction = actionsInProgressByType[action.entryType];
        const isEntryTypeInProgress = Boolean(inProgressAction);

        const linkTarget = isEntryTypeInProgress
            ? routes.eventView(inProgressAction.metadata.uid)
            : routes.eventAdd(action.entryType.replace('EntryType.', ''));

        return {
            title,
            icon: EntryTypeIcon,
            color: iconColor,
            isActive: isEntryTypeInProgress,
            linkTarget,
        } satisfies ActionProps;
    });

    return (
        <Card withBorder radius="md" className={classes.card} mt={'2rem'}>
            <Group justify="space-between">
                <Text fs="italic" className={classes.title}>
                    {/* TODO: Localize */}
                    What would you like to log?
                </Text>
                <NavLink to={routes.logsInProgress}>
                    {() => (
                        <Badge
                            color={hasActionsInProgress ? 'indigo' : 'grey'}
                            variant={
                                hasActionsInProgress ? 'filled' : 'outline'
                            }
                            style={{ cursor: 'unset' }}
                        >
                            {/* TODO: Localize */}
                            {`${String(actionsInProgress.length)} action(s) in progress`}
                        </Badge>
                    )}
                </NavLink>
            </Group>
            <ActionsGrid actions={actionElements} />
        </Card>
    );
}
