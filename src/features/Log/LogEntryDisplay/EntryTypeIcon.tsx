import React from 'react';
import { LogEntry } from '../../../common/store/types/storeData.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../../common/utils/entryMappers';
import { Avatar, Indicator } from '@mantine/core';

import classes from './EntryTypeIcon.module.css';
import { isTimedEntry } from '../../../common/utils/entryGuards';

interface EntryTypeIconProps {
    entry: LogEntry;
}

const EntryTypeIconBase = (props: EntryTypeIconProps) => {
    const IconComponent = mapEntryTypeToIcon(props.entry.entryType);

    const isInProgress =
        isTimedEntry(props.entry) && !props.entry.params.endedAt;

    return (
        <Indicator
            disabled={!isInProgress}
            inline
            processing
            color="indigo"
            size={12}
            offset={6}
            className={classes.itemContainer}
            zIndex="calc(var(--app-stickyheader-z-index) - 1)"
        >
            <Avatar
                title={mapEntryTypeToName(props.entry.entryType)}
                color={mapEntryTypeToColor(props.entry.entryType)}
            >
                <IconComponent className={classes.icon} />
            </Avatar>
        </Indicator>
    );
};

export const EntryTypeIcon = React.memo(EntryTypeIconBase);
