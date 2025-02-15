import { Text } from '@mantine/core';
import { LogEntry } from '../../../common/store/types/storeData.types';
import { EventCard } from '../common/components/EventCard/EventCard';
import { useNavigate } from 'react-router';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { ResponsiveStack } from '../../../common/design/ResponsiveStack';
import { ResponsiveButton } from '../../../common/design/ResponsiveButton';
import { EventDetailsModifier } from './EventDetailsModifier/EventDetailsModifier';
import { useCallback, useState } from 'react';
import {
    EventModifier,
    EventModifierOptions,
    RegisterEventModifier,
} from './ModifyEvent.types';
import { useAppStore } from '../../../common/store/store';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmCancelModal } from './ConfirmCancelModal';
import { routes } from '../../../common/routes';

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
        (
            name: string,
            modifier: EventModifier,
            validate: () => { hasErrors: boolean }
        ) => {
            const modifierWithValidation: EventModifier = (
                modEvent,
                options
            ) => {
                const shouldRunValidation = !options?.preventValidationTrigger;

                if (shouldRunValidation) {
                    if (validate().hasErrors) {
                        return {
                            isValid: false,
                            event: modEvent,
                        };
                    }
                }

                return modifier(modEvent, options);
            };

            setEventModifiers((prevModifiers) => {
                return {
                    ...prevModifiers,
                    [name]: modifierWithValidation,
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
        (oldEvent: LogEntry, options?: EventModifierOptions) => {
            return Object.values(eventModifiers).reduce(
                (result, modifier) => {
                    const modificationResult = modifier(result.event, options);

                    return {
                        event: modificationResult.event,
                        isValid: !result.isValid
                            ? result.isValid
                            : modificationResult.isValid,
                    };
                },
                {
                    event: window.structuredClone(oldEvent),
                    isValid: true,
                }
            );
        },
        [eventModifiers]
    );

    const handleCancelModifications = () => {
        const oldEvent = event;
        const newEvent = applyModifiers(oldEvent, {
            preventValidationTrigger: true,
        }).event;

        const hasModifications =
            JSON.stringify(oldEvent) !== JSON.stringify(newEvent);

        if (!hasModifications) {
            void navigate(routes.eventView(event.metadata.uid));

            return;
        }

        openConfirmCancel();
    };

    const saveModifications = () => {
        const oldEvent = event;
        const modificationResult = applyModifiers(oldEvent);

        if (!modificationResult.isValid) {
            return;
        }

        const newEvent = modificationResult.event;

        if (oldEvent.metadata.createdAt !== newEvent.metadata.createdAt) {
            deleteEntry(newEvent.metadata.uid);
            insertEntry(newEvent);
        } else {
            editEntry(newEvent.metadata.uid, newEvent);
        }

        void navigate(routes.eventView(event.metadata.uid));
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
                    void navigate(routes.eventView(event.metadata.uid));
                }}
            />
        </>
    );
};
