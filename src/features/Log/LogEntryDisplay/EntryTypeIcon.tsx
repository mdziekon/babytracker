import React from 'react';
import { EntryType } from '../../../common/store/store.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../common/utils/entryMappers';
import { Avatar } from '@mantine/core';

import classes from './EntryTypeIcon.module.css';

interface EntryTypeIconProps {
    entryType: EntryType;
}

const EntryTypeIconBase = (props: EntryTypeIconProps) => {
    const IconComponent = mapEntryTypeToIcon(props.entryType);

    return (
        <Avatar
            title={mapEntryTypeToName(props.entryType)}
            color={mapEntryTypeToColor(props.entryType)}
        >
            <IconComponent className={classes.icon} />
        </Avatar>
    );
};

export const EntryTypeIcon = React.memo(EntryTypeIconBase);
