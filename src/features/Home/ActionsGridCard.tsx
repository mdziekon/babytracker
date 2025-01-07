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
import { FunctionComponent } from 'react';
import { IconProps } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router';

interface ActionsGridCardProps {
    actions: (
        | {
              title: string;
              icon: FunctionComponent<IconProps>;
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
        return (
            <UnstyledButton
                key={action.title}
                className={classes.item}
                style={{ padding: '0.5rem' }}
                component={NavLink}
                to={action.linkLocation ?? ''}
            >
                <action.icon
                    color={
                        action.color ? theme.colors[action.color][6] : undefined
                    }
                    size={32}
                />
                <Text ta="center" size="xs" mt={7} fw="bold">
                    {action.title}
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
                <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                    <Badge
                        color={hasActionsInProgress ? 'indigo' : 'grey'}
                        variant={hasActionsInProgress ? 'filled' : 'outline'}
                    >
                        {/* TODO: Localize */}
                        {`${String(actionsInProgress)} action(s) in progress`}
                    </Badge>
                </Anchor>
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
