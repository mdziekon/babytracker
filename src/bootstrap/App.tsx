import { BrowserRouter } from 'react-router';
import { AppRouting } from './AppRouting';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import { theme } from './theme';

export const App = () => {
    return (
        <>
            <MantineProvider theme={theme} defaultColorScheme="dark">
                <BrowserRouter>
                    <AppRouting />
                </BrowserRouter>
            </MantineProvider>
        </>
    );
};
