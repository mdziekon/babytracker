import {
    Badge,
    Box,
    Card,
    Group,
    Indicator,
    SimpleGrid,
    Text,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
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
    const theme = useMantineTheme();

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

    const actionElements = actions.map((action, actionIdx) => {
        if (!action) {
            return <Box visibleFrom="xs" key={actionIdx} />;
        }

        const title = mapEntryTypeToName(action.entryType);
        const EntryTypeIcon = mapEntryTypeToIcon(action.entryType);
        const iconColor = mapEntryTypeToColor(action.entryType);

        const inProgressAction = actionsInProgressByType[action.entryType];
        const isEntryTypeInProgress = Boolean(inProgressAction);

        const linkTarget = isEntryTypeInProgress
            ? routes.eventView(inProgressAction.metadata.uid)
            : routes.eventAdd(action.entryType.replace('EntryType.', ''));

        return (
            <Indicator
                key={title}
                disabled={!isEntryTypeInProgress}
                inline
                processing
                color="indigo"
                size={16}
                offset={4}
                className={classes.itemContainer}
            >
                <UnstyledButton
                    className={classes.item}
                    style={{ padding: '0.5rem' }}
                    component={NavLink}
                    to={linkTarget}
                >
                    <EntryTypeIcon
                        color={theme.colors[iconColor][6]}
                        size={32}
                    />
                    <Text ta="center" size="xs" mt={7} fw="bold">
                        {title}
                    </Text>
                </UnstyledButton>
            </Indicator>
        );
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
            <SimpleGrid
                cols={{
                    base: 3,
                    xs: 3,
                }}
                mt="md"
                maw={{
                    base: '22rem',
                    xs: '26.25rem',
                }}
                w="100%"
                ml="auto"
                mr="auto"
            >
                {actionElements}
            </SimpleGrid>
        </Card>
    );
}
