import { Box, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

interface EntryDatesProps {
    started: dayjs.Dayjs;
    ended: dayjs.Dayjs | null | undefined;
}

const EntryDatesBase = (props: EntryDatesProps) => {
    return (
        <Box>
            {props.ended === undefined ? (
                props.started.format('HH:mm')
            ) : (
                <>
                    {props.started.format('HH:mm')}
                    {' - '}
                    {props.ended ? (
                        props.ended.format('HH:mm')
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
