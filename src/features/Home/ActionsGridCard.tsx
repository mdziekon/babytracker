import {
    Anchor,
    Badge,
    Box,
    Card,
    Group,
    SimpleGrid,
    Text,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import classes from './ActionsGridCard.module.css';
import { NavLink } from 'react-router';
import { EntryType } from '../../common/store/store.types';
import {
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../common/utils/entryMappers';

interface ActionsGridCardProps {
    actions: (
        | {
              entryType: EntryType;
              color?: string;
              linkLocation?: string;
          }
        | undefined
    )[];
    actionsInProgress: number;
}

export function ActionsGridCard(props: ActionsGridCardProps) {
    const { actions, actionsInProgress } = props;
    const theme = useMantineTheme();

    const hasActionsInProgress = actionsInProgress > 0;

    const actionElements = actions.map((action, actionIdx) => {
        if (!action) {
            return <Box visibleFrom="xs" key={actionIdx} />;
        }

        const title = mapEntryTypeToName(action.entryType);
        const EntryTypeIcon = mapEntryTypeToIcon(action.entryType);

        return (
            <UnstyledButton
                key={title}
                className={classes.item}
                style={{ padding: '0.5rem' }}
                component={NavLink}
                to={action.linkLocation ?? ''}
            >
                <EntryTypeIcon
                    color={
                        action.color ? theme.colors[action.color][6] : undefined
                    }
                    size={32}
                />
                <Text ta="center" size="xs" mt={7} fw="bold">
                    {title}
                </Text>
            </UnstyledButton>
        );
    });

    return (
        <Card withBorder radius="md" className={classes.card} mt={'2rem'}>
            <Group justify="space-between">
                <Text fs="italic" className={classes.title}>
                    {/* TODO: Localize */}
                    What would you like to log?
                </Text>
                <NavLink to="/log/in-progress">
                    {() => (
                        <Badge
                            color={hasActionsInProgress ? 'indigo' : 'grey'}
                            variant={
                                hasActionsInProgress ? 'filled' : 'outline'
                            }
                            style={{ cursor: 'unset' }}
                        >
                            {/* TODO: Localize */}
                            {`${String(actionsInProgress)} action(s) in progress`}
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
