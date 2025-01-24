import { Text } from '@mantine/core';
import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../common/EventCard/EventCard';
import { useNavigate } from 'react-router';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { ResponsiveStack } from '../../../common/design/ResponsiveStack';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';
import { EventDetailsModifier } from './EventDetailsModifier/EventDetailsModifier';
import { useCallback, useState } from 'react';
import { EventModifier, RegisterEventModifier } from './ModifyEvent.types';
import { useAppStore } from '../../../common/store/store';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmCancelModal } from './ConfirmCancelModal';

interface ModifyEventProps {
    event: LogEntry;
}

export const ModifyEvent = (props: ModifyEventProps) => {
    const { event } = props;

    const navigate = useNavigate();
    const editEntry = useAppStore((state) => state.api.editEntry);
    const insertEntry = useAppStore((state) => state.api.insertEntry);
    const deleteEntry = useAppStore((state) => state.api.deleteEntry);

    const [
        isConfirmCancelOpen,
        { open: openConfirmCancel, close: closeConfirmCancel },
    ] = useDisclosure(false);

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

    const applyModifiers = useCallback(
        (oldEvent: LogEntry) => {
            return Object.values(eventModifiers).reduce((result, modifier) => {
                return modifier(result);
            }, window.structuredClone(oldEvent));
        },
        [eventModifiers]
    );

    const handleCancelModifications = () => {
        const oldEvent = event;
        const newEvent = applyModifiers(oldEvent);

        const hasModifications =
            JSON.stringify(oldEvent) !== JSON.stringify(newEvent);

        if (!hasModifications) {
            void navigate(`/event/edit/${event.metadata.uid}`);

            return;
        }

        openConfirmCancel();
    };

    const saveModifications = () => {
        const oldEvent = event;
        const newEvent = applyModifiers(oldEvent);

        if (oldEvent.metadata.createdAt !== newEvent.metadata.createdAt) {
            deleteEntry(newEvent.metadata.uid);
            insertEntry(newEvent);
        } else {
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
                            variant="light"
                            color="orange"
                            fullWidth
                            onClick={handleCancelModifications}
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

            <ConfirmCancelModal
                isModalOpen={isConfirmCancelOpen}
                onModalClose={closeConfirmCancel}
                onModificationsCancelled={() => {
                    void navigate(`/event/edit/${event.metadata.uid}`);
                }}
            />
        </>
    );
};
