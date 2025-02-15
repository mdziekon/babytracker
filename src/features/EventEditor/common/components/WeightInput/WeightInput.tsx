import { NumberInput } from '@mantine/core';
import { ComponentProps } from 'react';

type WeightInputProps = ComponentProps<typeof NumberInput>;

export const WeightInput = (props: WeightInputProps) => {
    return (
        <NumberInput
            rightSection={'g'}
            rightSectionPointerEvents="none"
            placeholder="5000"
            decimalScale={0}
            max={99_999}
            clampBehavior="strict"
            thousandSeparator=" "
            allowNegative={false}
            {...props}
        />
    );
};
