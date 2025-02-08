import {
    Box,
    Indicator,
    SimpleGrid,
    Text,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import classes from './ActionsGrid.module.css';
import { NavLink } from 'react-router';
import { IconBabyBottle } from '@tabler/icons-react';

export interface ActionProps {
    linkTarget: string;
    icon: typeof IconBabyBottle;
    title: string;
    color: string;
    isActive?: boolean;
}

interface ActionsGridProps {
    actions: (ActionProps | undefined)[];
}

export function ActionsGrid(props: ActionsGridProps) {
    const { actions } = props;
    const theme = useMantineTheme();

    const actionElements = actions.map((action, actionIdx) => {
        if (!action) {
            return <Box visibleFrom="xs" key={actionIdx} />;
        }

        return (
            <Indicator
                key={action.title}
                disabled={!action.isActive}
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
                    to={action.linkTarget}
                >
                    <action.icon
                        color={theme.colors[action.color][6]}
                        size={32}
                    />
                    <Text ta="center" size="xs" mt={7} fw="bold">
                        {action.title}
                    </Text>
                </UnstyledButton>
            </Indicator>
        );
    });

    return (
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
    );
}
