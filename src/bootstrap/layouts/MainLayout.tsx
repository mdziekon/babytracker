import { AppShell, Container, Group, Loader, Text } from '@mantine/core';
import { IconHome, IconNotebook } from '@tabler/icons-react';
import { Outlet } from 'react-router';
import { useAppStore } from '../../common/store/store';

import classes from './MainLayout.module.css';
import { FooterNavigation } from './FooterNavigation';

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
            <FooterNavigation>
                <FooterNavigation.NavigationItem
                    icon={<IconHome />}
                    to="/"
                    title="Home"
                />
                <FooterNavigation.NavigationItem
                    icon={<IconNotebook />}
                    to="/log"
                    title="Log"
                />
            </FooterNavigation>
        </AppShell>
    );
};
