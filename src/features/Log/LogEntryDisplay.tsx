import { ActionIcon, Avatar, Box, Menu, rem, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { IconClock, IconDots, IconTrash } from '@tabler/icons-react';
import { DateISO8601, LogEntry } from '../../common/store/store.types';
import {
    mapEntryTypeToColor,
    mapEntryTypeToIcon,
    mapEntryTypeToName,
} from '../../common/utils/entryMappers';
import { useNavigate } from 'react-router';
import { LogEntryEventMiniDetails } from './LogEntryEventMiniDetails/LogEntryEventMiniDetails';
import classes from './Log.module.css';
import { useDisclosure } from '@mantine/hooks';
import { EntryDeleteModal } from '../../common/features/EntryDeleteModal/EntryDeleteModal';
import { MiniDetailsEntry } from './LogEntryEventMiniDetails/MiniDetailsEntry/MiniDetailsEntry';
import { Duration } from '../EventEditor/EventDetails/DetailsTimedEvent/DurationFromNow';

interface LogEntryProps {
    entry: LogEntry;
}

export const LogEntryDisplay = (props: LogEntryProps) => {
    const { entry } = props;
    const navigate = useNavigate();
    const [
        isConfirmDeleteOpen,
        { open: openConfirmDelete, close: closeConfirmDelete },
    ] = useDisclosure(false);

    const entryTime = (() => {
        const hasStartedAt = (
            entry: LogEntry
        ): entry is LogEntry & { params: { startedAt: DateISO8601 } } => {
            return Object.hasOwn(entry.params ?? {}, 'startedAt');
        };
        const hasEndedAt = (
            entry: LogEntry
        ): entry is LogEntry & { params: { endedAt: DateISO8601 } } => {
            return Object.hasOwn(entry.params ?? {}, 'endedAt');
        };

        if (hasStartedAt(entry)) {
            if (hasEndedAt(entry)) {
                return [entry.params.startedAt, entry.params.endedAt] as const;
            }

            return [entry.params.startedAt, undefined] as const;
        }

        return [entry.metadata.createdAt] as const;
    })();
    const entryDuration = (() => {
        if (entryTime.length !== 2 || entryTime[1] === undefined) {
            return;
        }

        return dayjs.duration(dayjs(entryTime[1]).diff(dayjs(entryTime[0])));
    })();

    const EntryTypeIcon = mapEntryTypeToIcon(entry.entryType);

    return (
        <>
            <Table.Tr
                key={entry.metadata.createdAt}
                onClick={() => {
                    void navigate(`/event/edit/${entry.metadata.uid}`);
                }}
            >
                <Table.Td w={rem(64)} h={rem(64)}>
                    <Avatar
                        title={mapEntryTypeToName(entry.entryType)}
                        color={mapEntryTypeToColor(entry.entryType)}
                    >
                        <EntryTypeIcon
                            style={{
                                width: rem(24),
                                height: rem(24),
                            }}
                        />
                    </Avatar>
                </Table.Td>
                <Table.Td>
                    <Box>
                        {entryTime.length === 1 ? (
                            dayjs(entryTime[0]).format('HH:mm')
                        ) : (
                            <>
                                {dayjs(entryTime[0]).format('HH:mm')}
                                {' - '}
                                {entryTime[1] ? (
                                    dayjs(entryTime[1]).format('HH:mm')
                                ) : (
                                    <Text component="span" fs="italic">
                                        In progress
                                    </Text>
                                )}
                            </>
                        )}
                    </Box>
                    <Box>
                        <LogEntryEventMiniDetails event={entry} />
                    </Box>
                </Table.Td>
                <Table.Td className={classes.durationColumn}>
                    {entryDuration && (
                        <MiniDetailsEntry
                            icon={<IconClock title="Duration" />}
                            title={<Duration duration={entryDuration} />}
                        />
                    )}
                </Table.Td>
                <Table.Td
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    className={classes.ctaColumn}
                    w={rem(48)}
                    align="right"
                >
                    <Menu shadow="md" position="bottom-end">
                        <Menu.Target>
                            <ActionIcon variant="default" size="md">
                                <IconDots
                                    style={{ width: '70%', height: '70%' }}
                                />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                color="red"
                                leftSection={
                                    <IconTrash
                                        style={{
                                            width: rem(14),
                                            height: rem(14),
                                        }}
                                    />
                                }
                                onClick={openConfirmDelete}
                            >
                                Delete entry
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Table.Td>
            </Table.Tr>

            <EntryDeleteModal
                entry={entry}
                isModalOpen={isConfirmDeleteOpen}
                onModalClose={closeConfirmDelete}
            />
        </>
    );
};
