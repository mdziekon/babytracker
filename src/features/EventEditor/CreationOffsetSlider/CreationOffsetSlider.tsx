import { Slider, Stack } from '@mantine/core';

import sliderClasses from './CreationOffsetSlider.module.css';

interface CreationOffsetSliderProps {
    onValueChange?: (value: number) => void;
}

export const CreationOffsetSlider = (props: CreationOffsetSliderProps) => {
    const marks = [
        { label: '-1h', value: 0 },
        { label: '-30m', value: 13 },
        { label: '-15m', value: 28 },
        { label: '-10m', value: 40 },
        { label: '-5m', value: 55 },
        { label: '-3m', value: 70 },
        { label: '-2m', value: 80 },
        { label: '-1m', value: 90 },
        { label: 'Now', value: 100 },
    ];

    return (
        <Stack gap="0.5rem">
            <span>Event began:</span>
            <div>
                <Slider
                    inverted
                    defaultValue={100}
                    label={(value: number) =>
                        marks.find((mark) => mark.value === value)?.label
                    }
                    restrictToMarks
                    marks={marks}
                    classNames={sliderClasses}
                    onChange={props.onValueChange}
                />
            </div>
        </Stack>
    );
};
