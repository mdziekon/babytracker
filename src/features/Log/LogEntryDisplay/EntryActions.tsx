import React, { useMemo } from 'react';
import { ActionIcon, Menu } from '@mantine/core';

import classes from './EntryActions.module.css';
import { IconCopy, IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router';
import { routes } from '../../../common/routes';
import {
    EntryType,
    LogEntry,
} from '../../../common/store/types/storeData.types';
import { useDuplicateEntry } from '../../../common/hooks/useDuplicateEntry';

interface EntryActionsProps {
    event: LogEntry;
    onOpenConfirmDelete: () => void;
}

const EntryActionsBase = (props: EntryActionsProps) => {
    const { event, onOpenConfirmDelete } = props;
    const { duplicateEntry } = useDuplicateEntry();

    const specificActions = useMemo(() => {
        if (
            event.entryType === EntryType.Medicine ||
            event.entryType === EntryType.DoctorsAppointment
        ) {
            const handleDuplicateEntry = () => {
                duplicateEntry(event);
            };

            return (
                <>
                    <Menu.Item
                        leftSection={
                            <IconCopy className={classes.menuItemIcon} />
                        }
                        onClick={handleDuplicateEntry}
                    >
                        Duplicate (with current date)
                    </Menu.Item>
                </>
            );
        }

        return;
    }, [duplicateEntry, event]);

    return (
        <Menu shadow="md" position="bottom-end">
            <Menu.Target>
                <ActionIcon variant="default" size="md">
                    <IconDots className={classes.iconOpenMenu} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {specificActions && (
                    <>
                        {specificActions}
                        <Menu.Divider />
                    </>
                )}
                <Menu.Item
                    component={Link}
                    leftSection={
                        <IconPencil className={classes.menuItemIcon} />
                    }
                    to={routes.eventEdit(event.metadata.uid)}
                >
                    Edit entry
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash className={classes.menuItemIcon} />}
                    onClick={onOpenConfirmDelete}
                >
                    Delete entry
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export const EntryActions = React.memo(EntryActionsBase);
