import { Select } from '@mantine/core';
import { ComponentProps } from 'react';
import { MedicineDoseType } from '../../../../common/store/types/storeData.types';

type MedicineDoseTypeInputProps = ComponentProps<typeof Select>;

export const MedicineDoseTypeInput = (props: MedicineDoseTypeInputProps) => {
    return <Select placeholder="Pick dose type" data={options} {...props} />;
};

const options = Object.entries(MedicineDoseType).map(([key, value]) => {
    return {
        value,
        label: key,
    };
});
