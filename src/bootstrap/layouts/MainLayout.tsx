import { ActionIcon, AppShell, Center, Group, Text } from '@mantine/core';
import { IconHome, IconNotebook } from '@tabler/icons-react';
import { NavLink, Outlet } from 'react-router';

export const MainLayout = () => {
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
            <AppShell.Main>
                <Outlet />
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
