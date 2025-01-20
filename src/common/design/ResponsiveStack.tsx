import {
    createPolymorphicComponent,
    Stack,
    StackProps,
    useMatches,
} from '@mantine/core';
import { forwardRef } from 'react';

export type ResponsiveStackProps = StackProps;

export const ResponsiveStack = createPolymorphicComponent<
    'div',
    ResponsiveStackProps
>(
    forwardRef<HTMLDivElement, ResponsiveStackProps>(({ ...others }, ref) => {
        const gap = useMatches({
            base: 'md',
            md: 'xs',
        });

        return <Stack gap={gap} {...others} ref={ref} />;
    })
);
