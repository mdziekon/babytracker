import { Text } from '@mantine/core';
import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { Link, useNavigate } from 'react-router';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { ResponsiveStack } from '../../../common/design/ResponsiveStack';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';
import { EventDetailsModifier } from '../EventDetailsModifier/EventDetailsModifier';
import { useCallback, useState } from 'react';
import { EventModifier, RegisterEventModifier } from './ModifyEvent.types';
import { useAppStore } from '../../../common/store/store';

interface ModifyEventProps {
    event: LogEntry;
}

export const ModifyEvent = (props: ModifyEventProps) => {
    const { event } = props;

    const navigate = useNavigate();
    const editEntry = useAppStore((state) => state.api.editEntry);
    const insertEntry = useAppStore((state) => state.api.insertEntry);
    const deleteEntry = useAppStore((state) => state.api.deleteEntry);

    const [eventModifiers, setEventModifiers] = useState<
        Record<string, EventModifier>
    >({});

    const registerEventModifier: RegisterEventModifier = useCallback(
        (name: string, modifier: EventModifier) => {
            setEventModifiers((prevModifiers) => {
                return {
                    ...prevModifiers,
                    [name]: modifier,
                };
            });

            return () => {
                setEventModifiers((prevModifiers) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { [name]: _thisMod, ...rest } = prevModifiers;

                    return rest;
                });
            };
        },
        []
    );

    // TODO: Confirm cancel if changes made
    // TODO: Confirm changes before saving (?)
    const saveModifications = () => {
        const oldEvent = event;

        const newEvent = Object.values(eventModifiers).reduce(
            (result, modifier) => {
                return modifier(result);
            },
            window.structuredClone(oldEvent)
        );

        if (oldEvent.metadata.createdAt !== newEvent.metadata.createdAt) {
            console.log('inserting');

            deleteEntry(newEvent.metadata.uid);
            insertEntry(newEvent);
        } else {
            console.log('editing');

            editEntry(newEvent.metadata.uid, newEvent);
        }

        void navigate(`/event/edit/${event.metadata.uid}`);
    };

    return (
        <>
            <EventCard
                eventType={event.entryType}
                middle={[
                    <EventDetailsModifier
                        registerEventModifier={registerEventModifier}
                        event={event}
                    />,
                ]}
                footer={
                    <ResponsiveStack>
                        <ResponsiveButton
                            component={Link}
                            variant="light"
                            color="orange"
                            fullWidth
                            to={`/event/edit/${event.metadata.uid}`}
                        >
                            <IconX />
                            <Text component="span" ml="0.25rem">
                                Cancel
                            </Text>
                        </ResponsiveButton>
                        <ResponsiveButton
                            variant="light"
                            color="green"
                            fullWidth
                            onClick={saveModifications}
                        >
                            <IconDeviceFloppy />
                            <Text component="span" ml="0.25rem">
                                Save changes
                            </Text>
                        </ResponsiveButton>
                    </ResponsiveStack>
                }
            />
        </>
    );
};
