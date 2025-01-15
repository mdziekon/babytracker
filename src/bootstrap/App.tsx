import { BrowserRouter } from 'react-router';
import { AppRouting } from './AppRouting';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import { theme } from './theme';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime, {
    thresholds: [
        { l: 's', r: 1 },
        { l: 'm', r: 1 },
        { l: 'mm', r: 59, d: 'minute' },
        { l: 'h', r: 1 },
        { l: 'hh', r: 23, d: 'hour' },
        { l: 'd', r: 1 },
        { l: 'dd', r: 29, d: 'day' },
        { l: 'M', r: 1 },
        { l: 'MM', r: 11, d: 'month' },
        { l: 'y', r: 1 },
        { l: 'yy', d: 'year' },
    ],
});
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(duration);

export const App = () => {
    return (
        <>
            <MantineProvider theme={theme} defaultColorScheme="dark">
                <BrowserRouter basename="/babytracker">
                    <AppRouting />
                </BrowserRouter>
            </MantineProvider>
        </>
    );
};
