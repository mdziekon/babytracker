import { NumberInput, rem } from '@mantine/core';
import { ComponentProps } from 'react';
import { MedicineDoseType } from '../../../../common/store/types/storeData.types';
import { mapMedicineDoseTypeToSuffix } from '../../../../common/utils/entryMappers';

type MedicineDoseInputProps = {
    selectedDoseType: MedicineDoseType;
} & ComponentProps<typeof NumberInput>;

export const MedicineDoseInput = (props: MedicineDoseInputProps) => {
    const { selectedDoseType, ...baseProps } = props;

    return (
        <NumberInput
            rightSection={mapMedicineDoseTypeToSuffix(selectedDoseType)}
            rightSectionPointerEvents="none"
            rightSectionWidth={70}
            rightSectionProps={{
                style: {
                    justifyContent: 'right',
                    paddingRight: rem(8),
                },
            }}
            placeholder="0"
            decimalScale={0}
            max={99_999}
            clampBehavior="strict"
            thousandSeparator=" "
            allowNegative={false}
            allowLeadingZeros={false}
            {...baseProps}
        />
    );
};
