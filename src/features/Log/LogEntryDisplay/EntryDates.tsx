import { Box, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';
import { DEFAULT_TIME_FORMAT } from '../../../common/utils/formatting';

interface EntryDatesProps {
    started: dayjs.Dayjs;
    ended: dayjs.Dayjs | null | undefined;
}

const EntryDatesBase = (props: EntryDatesProps) => {
    return (
        <Box>
            {props.ended === undefined ? (
                props.started.format(DEFAULT_TIME_FORMAT)
            ) : (
                <>
                    {props.started.format(DEFAULT_TIME_FORMAT)}
                    {' - '}
                    {props.ended ? (
                        props.ended.format(DEFAULT_TIME_FORMAT)
                    ) : (
                        <Text component="span" fs="italic">
                            In progress
                        </Text>
                    )}
                </>
            )}
        </Box>
    );
};

export const EntryDates = React.memo(EntryDatesBase);
