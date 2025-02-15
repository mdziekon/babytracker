import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCopy, IconPencil, IconTrash } from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { ResponsiveStack } from '../../../../common/design/ResponsiveStack';
import { EntryDeleteModal } from '../../../../common/features/EntryDeleteModal/EntryDeleteModal';
import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { EventCard } from '../../common/EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';
import { EventNotes } from './EventNotes/EventNotes';
import { routes } from '../../../../common/routes';
import { useDuplicateEntry } from '../../../../common/hooks/useDuplicateEntry';
import { useMemo } from 'react';

interface CompleteEventProps {
    event: LogEntry;
}

export const CompleteEvent = (props: CompleteEventProps) => {
    const { event } = props;
    const { duplicateEntry } = useDuplicateEntry();
    const navigate = useNavigate();

    const [
        isConfirmDeleteOpen,
        { open: openConfirmDelete, close: closeConfirmDelete },
    ] = useDisclosure(false);

    const specificActions = useMemo(() => {
        if (
            event.entryType === EntryType.Medicine ||
            event.entryType === EntryType.DoctorsAppointment
        ) {
            const handleDuplicateEntry = () => {
                duplicateEntry(event);
            };

            return (
                <ResponsiveStack>
                    <ResponsiveButton
                        variant="light"
                        color="grape"
                        fullWidth
                        onClick={handleDuplicateEntry}
                    >
                        <IconCopy />
                        <Text component="span" ml="0.25rem">
                            Duplicate (with current date)
                        </Text>
                    </ResponsiveButton>
                </ResponsiveStack>
            );
        }

        return;
    }, [duplicateEntry, event]);

    return (
        <>
            <EventCard
                eventType={event.entryType}
                middle={[
                    <EventDetails event={event} />,
                    <EventNotes event={event} />,
                    specificActions,
                ]}
                footer={
                    <ResponsiveStack>
                        <ResponsiveButton
                            component={Link}
                            variant="light"
                            color="indigo"
                            fullWidth
                            to={routes.eventEdit(event.metadata.uid)}
                        >
                            <IconPencil />
                            <Text component="span" ml="0.25rem">
                                Edit entry
                            </Text>
                        </ResponsiveButton>
                        <ResponsiveButton
                            variant="light"
                            color="red"
                            fullWidth
                            onClick={openConfirmDelete}
                        >
                            <IconTrash />
                            <Text component="span" ml="0.25rem">
                                Delete entry
                            </Text>
                        </ResponsiveButton>
                    </ResponsiveStack>
                }
            />

            <EntryDeleteModal
                entry={event}
                isModalOpen={isConfirmDeleteOpen}
                onModalClose={closeConfirmDelete}
                onEntryDeleted={() => {
                    // TODO: This interaction causes error due to EventEditor missing id
                    void navigate(routes.logs);
                }}
            />
        </>
    );
};
