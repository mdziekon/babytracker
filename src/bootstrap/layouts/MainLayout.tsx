import { AppShell, Box, Container, Loader } from '@mantine/core';
import { IconHome, IconNotebook } from '@tabler/icons-react';
import { Outlet } from 'react-router';
import { useAppStore } from '../../common/store/store';

import classes from './MainLayout.module.css';
import { FooterNavigation } from './FooterNavigation';
import { HeaderNavigation } from './HeaderNavigation';

export const MainLayout = () => {
    const isLoading = useAppStore((state) => !state.meta.hasHydrated);

    return (
        <AppShell
            header={{ height: { base: 0, md: 60 } }}
            footer={{ height: { base: 60, md: 0 }, collapsed: false }}
            padding="md"
        >
            <Box visibleFrom="md">
                <HeaderNavigation>
                    {navigationItems.map((item) => (
                        <HeaderNavigation.NavigationItem
                            key={item.to}
                            {...item}
                        />
                    ))}
                </HeaderNavigation>
            </Box>
            <AppShell.Main px={{ base: '0rem', xs: '1rem' }}>
                <Container
                    className={`${classes.contentContainer} ${classes.contentContainerRoot}`}
                >
                    {isLoading ? <Loader color="primary" /> : <Outlet />}
                </Container>
            </AppShell.Main>
            <Box hiddenFrom="md">
                <FooterNavigation>
                    {navigationItems.map((item) => (
                        <FooterNavigation.NavigationItem
                            key={item.to}
                            {...item}
                        />
                    ))}
                </FooterNavigation>
            </Box>
        </AppShell>
    );
};

const navigationItems = [
    {
        icon: <IconHome />,
        to: '/',
        title: 'Home',
    },
    {
        icon: <IconNotebook />,
        to: '/log',
        title: 'Log',
    },
];
