import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';

import classes from './EntryActions.module.css';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router';
import { routes } from '../../../common/routes';

interface EntryActionsProps {
    entryUid: string;
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
                    component={Link}
                    leftSection={
                        <IconPencil className={classes.menuItemIcon} />
                    }
                    to={routes.eventEdit(props.entryUid)}
                >
                    Edit entry
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash className={classes.menuItemIcon} />}
                    onClick={props.onOpenConfirmDelete}
                >
                    Delete entry
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export const EntryActions = React.memo(EntryActionsBase);
