import { NumberInput } from '@mantine/core';
import { ComponentProps } from 'react';
import { TemperatureUnit } from '../../../../../common/store/types/storeData.types';
import { mapTemperatureUnitToLabel } from '../../../../../common/utils/entryMappers';

interface TemperatureInputProps extends ComponentProps<typeof NumberInput> {
    unit: TemperatureUnit;
}

export const TemperatureInput = (props: TemperatureInputProps) => {
    const { unit, ...restProps } = props;

    const unitSymbol = mapTemperatureUnitToLabel(unit);

    return (
        <NumberInput
            rightSection={unitSymbol}
            rightSectionPointerEvents="none"
            placeholder="37.0"
            decimalScale={1}
            min={25}
            max={45}
            allowNegative={false}
            {...restProps}
        />
    );
};
