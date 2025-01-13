import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';

import classes from './EntryActions.module.css';
import { IconDots, IconTrash } from '@tabler/icons-react';

interface EntryActionsProps {
    onOpenConfirmDelete: () => void;
}

const EntryActionsBase = (props: EntryActionsProps) => {
    return (
        <Menu shadow="md" position="bottom-end">
            <Menu.Target>
                <ActionIcon variant="default" size="md">
                    <IconDots className={classes.iconOpenMenu} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    color="red"
                    leftSection={
                        <IconTrash className={classes.iconDeleteEntry} />
                    }
                    onClick={props.onOpenConfirmDelete}
                >
                    Delete entry
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export const EntryActions = React.memo(EntryActionsBase);
