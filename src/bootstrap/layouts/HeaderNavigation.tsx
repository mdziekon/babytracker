import { AppShell, Button, Group, Text } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

import classes from './HeaderNavigation.module.css';

import { NavLink } from 'react-router';

export const HeaderNavigation = (
    props: PropsWithChildren
): React.JSX.Element => {
    const { children } = props;

    return (
        <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                    fw={700}
                >
                    BabyTracker
                </Text>
                <Group gap="xs">{children}</Group>
            </Group>
        </AppShell.Header>
    );
};

export interface NavigationIconProps {
    icon: React.JSX.Element;
    to: string;
    title: string;
}

const NavigationIcon = (props: NavigationIconProps): React.JSX.Element => {
    const { icon: Icon, to, title } = props;

    return (
        <NavLink to={to} className={classes.link}>
            {({ isActive }) => {
                return (
                    <Button
                        variant={isActive ? 'filled' : 'subtle'}
                        leftSection={<Icon.type {...Icon.props} size={24} />}
                    >
                        {title}
                    </Button>
                );
            }}
        </NavLink>
    );
};

HeaderNavigation.NavigationItem = NavigationIcon;
