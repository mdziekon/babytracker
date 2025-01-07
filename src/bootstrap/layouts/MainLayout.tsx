import {
    ActionIcon,
    AppShell,
    Center,
    Container,
    Group,
    Loader,
    Text,
} from '@mantine/core';
import { IconHome, IconNotebook } from '@tabler/icons-react';
import { NavLink, Outlet } from 'react-router';
import { useAppStore } from '../../common/store/store';

import classes from './MainLayout.module.css';

export const MainLayout = () => {
    const isLoading = useAppStore((state) => !state.meta.hasHydrated);

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60, collapsed: false }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Text
                        inherit
                        variant="gradient"
                        component="span"
                        gradient={{ from: 'pink', to: 'yellow' }}
                        fw={700}
                    >
                        BabyTracker
                    </Text>
                </Group>
            </AppShell.Header>
            <AppShell.Main px={{ base: '0rem', xs: '1rem' }}>
                <Container
                    className={`${classes.contentContainer} ${classes.contentContainerRoot}`}
                >
                    {isLoading ? <Loader color="primary" /> : <Outlet />}
                </Container>
            </AppShell.Main>
            <AppShell.Footer>
                <Center h="100%" px="md">
                    <Group gap="xs">
                        <NavLink to="/">
                            {({ isActive }) => (
                                <ActionIcon
                                    variant={isActive ? 'filled' : 'light'}
                                    size="lg"
                                >
                                    <IconHome
                                        style={{
                                            width: '70%',
                                            height: '70%',
                                        }}
                                        stroke={1.5}
                                    />
                                </ActionIcon>
                            )}
                        </NavLink>
                        <NavLink to="/log">
                            {({ isActive }) => (
                                <ActionIcon
                                    variant={isActive ? 'filled' : 'light'}
                                    size="lg"
                                >
                                    <IconNotebook
                                        style={{ width: '70%', height: '70%' }}
                                        stroke={1.5}
                                    />
                                </ActionIcon>
                            )}
                        </NavLink>
                    </Group>
                </Center>
            </AppShell.Footer>
        </AppShell>
    );
};
