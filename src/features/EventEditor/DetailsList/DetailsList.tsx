import { Stack } from '@mantine/core';

import classes from './DetailsList.module.css';

interface DetailsListProps {
    details: React.ReactNode[];
}

export const DetailsList = (props: DetailsListProps) => {
    return (
        <Stack gap="0.125rem" className={classes.detailsList}>
            {...props.details}
        </Stack>
    );
};
