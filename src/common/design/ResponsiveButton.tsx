import {
    Button,
    ButtonProps,
    createPolymorphicComponent,
    useMatches,
} from '@mantine/core';
import { forwardRef } from 'react';

export type ResponsiveButtonProps = ButtonProps;

export const ResponsiveButton = createPolymorphicComponent<
    'button',
    ResponsiveButtonProps
>(
    forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
        ({ ...others }, ref) => {
            const size = useMatches({
                base: 'md',
                md: 'sm',
            });

            return <Button size={size} {...others} ref={ref} />;
        }
    )
);
