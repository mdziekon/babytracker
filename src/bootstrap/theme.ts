import { createTheme, MantineColorsTuple } from '@mantine/core';

const primary: MantineColorsTuple = [
    '#e9fbef',
    '#dbf2e1',
    '#b9e1c4',
    '#94d0a5',
    '#74c18a',
    '#60b878',
    '#54b46f',
    '#449e5d',
    '#398d51',
    '#297a43',
];

export const theme = createTheme({
    colors: {
        primary,
    },

    primaryColor: 'primary',
});
