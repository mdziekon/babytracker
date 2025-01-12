import { AppShell, Group, Stack, Text, Transition } from '@mantine/core';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import classes from './FooterNavigation.module.css';

import { NavLink } from 'react-router';

export const FooterNavigation = (
    props: PropsWithChildren
): React.JSX.Element => {
    const { children } = props;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Transition
            mounted={mounted}
            transition="slide-up"
            duration={400}
            timingFunction="ease"
        >
            {(styles) => (
                <AppShell.Footer
                    h={60}
                    className={classes.footer}
                    style={styles}
                >
                    <Group grow className={classes.icons}>
                        {children}
                    </Group>
                </AppShell.Footer>
            )}
        </Transition>
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
                    <Stack align="center" gap="0.25rem">
                        <Icon.type
                            {...Icon.props}
                            size={24}
                            className={`${classes.icon} ${isActive ? classes.iconActive : ''}`}
                        />
                        <Text
                            size="xs"
                            className={`${classes.title} ${isActive ? classes.titleActive : ''}`}
                            fw={700}
                        >
                            {title}
                        </Text>
                    </Stack>
                );
            }}
        </NavLink>
    );
};

FooterNavigation.NavigationItem = NavigationIcon;
