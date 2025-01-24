import React from 'react';
import { EntryType } from '../../../common/store/store.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../common/utils/entryMappers';
import { Avatar, Indicator } from '@mantine/core';

import classes from './EntryTypeIcon.module.css';

interface EntryTypeIconProps {
    entryType: EntryType;
    isInProgress: boolean;
}

const EntryTypeIconBase = (props: EntryTypeIconProps) => {
    const IconComponent = mapEntryTypeToIcon(props.entryType);

    return (
        <Indicator
            disabled={!props.isInProgress}
            inline
            processing
            color="indigo"
            size={12}
            offset={6}
            className={classes.itemContainer}
            zIndex="calc(var(--app-stickyheader-z-index) - 1)"
        >
            <Avatar
                title={mapEntryTypeToName(props.entryType)}
                color={mapEntryTypeToColor(props.entryType)}
            >
                <IconComponent className={classes.icon} />
            </Avatar>
        </Indicator>
    );
};

export const EntryTypeIcon = React.memo(EntryTypeIconBase);
