import { Box, Group, rem, SegmentedControl } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import {
    EntryDiaperChangeVariant,
    EntryType,
} from '../../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../EventCard/EventCard';
import { IconDroplets, IconPoo, IconQuestionMark } from '@tabler/icons-react';
import { useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';

const eventType = EntryType.DiaperChange;

export const AddDiaperChangeEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const [reason, setReason] =
        useState<EntryDiaperChangeVariant['params']['reason']>(
            'STOOL_AND_URINE'
        );

    const handleAddEvent = () => {
        const newEntry = addEntry(
            createNewEvent(() => {
                return {
                    entryType: eventType,
                    params: {
                        reason,
                    },
                };
            })
        );

        void navigate(`/event/edit/${newEntry.metadata.uid}`);
    };

    return (
        <EventCard
            eventType={eventType}
            middle={
                <>
                    <Box>
                        <SegmentedControl
                            fullWidth
                            orientation="vertical"
                            defaultValue={reason}
                            onChange={(value) => {
                                setReason(value as unknown as typeof reason);
                            }}
                            data={
                                [
                                    {
                                        value: 'STOOL',
                                        label: (
                                            <Group gap="xs">
                                                <Group
                                                    style={{
                                                        width: rem(24 * 2),
                                                    }}
                                                    justify="flex-end"
                                                >
                                                    <IconPoo
                                                        style={{
                                                            width: rem(24),
                                                            height: rem(24),
                                                        }}
                                                    />
                                                </Group>
                                                <div>Stool</div>
                                            </Group>
                                        ),
                                    },
                                    {
                                        value: 'STOOL_AND_URINE',
                                        label: (
                                            <Group gap="xs">
                                                <Group
                                                    style={{
                                                        width: rem(24 * 2),
                                                    }}
                                                    justify="flex-end"
                                                >
                                                    <div>
                                                        <IconPoo
                                                            style={{
                                                                width: rem(24),
                                                                height: rem(24),
                                                            }}
                                                        />
                                                        <IconDroplets
                                                            style={{
                                                                width: rem(24),
                                                                height: rem(24),
                                                            }}
                                                        />
                                                    </div>
                                                </Group>
                                                <div>Stool & Urine</div>
                                            </Group>
                                        ),
                                    },
                                    {
                                        value: 'URINE',
                                        label: (
                                            <Group gap="xs">
                                                <Group
                                                    style={{
                                                        width: rem(24 * 2),
                                                    }}
                                                    justify="flex-end"
                                                >
                                                    <IconDroplets
                                                        style={{
                                                            width: rem(24),
                                                            height: rem(24),
                                                        }}
                                                    />
                                                </Group>
                                                <div>Urine</div>
                                            </Group>
                                        ),
                                    },
                                    {
                                        value: 'OTHER',
                                        label: (
                                            <Group gap="xs">
                                                <Group
                                                    style={{
                                                        width: rem(24 * 2),
                                                    }}
                                                    justify="flex-end"
                                                >
                                                    <IconQuestionMark
                                                        style={{
                                                            width: rem(24),
                                                            height: rem(24),
                                                        }}
                                                    />
                                                </Group>
                                                <div>Other</div>
                                            </Group>
                                        ),
                                    },
                                ] satisfies {
                                    value: EntryDiaperChangeVariant['params']['reason'];
                                    label: React.ReactNode;
                                }[]
                            }
                        />
                    </Box>
                </>
            }
            footer={
                <ResponsiveButton
                    variant="primary"
                    fullWidth
                    onClick={handleAddEvent}
                >
                    Add event
                </ResponsiveButton>
            }
        />
    );
};
