import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { ResponsiveStack } from '../../../../common/design/ResponsiveStack';
import { EntryDeleteModal } from '../../../../common/features/EntryDeleteModal/EntryDeleteModal';
import { LogEntry } from '../../../../common/store/types/storeData.types';
import { EventCard } from '../../common/EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';
import { EventNotes } from './EventNotes/EventNotes';
import { routes } from '../../../../common/routes';

interface CompleteEventProps {
    event: LogEntry;
}

export const CompleteEvent = (props: CompleteEventProps) => {
    const { event } = props;
    const navigate = useNavigate();

    const [
        isConfirmDeleteOpen,
        { open: openConfirmDelete, close: closeConfirmDelete },
    ] = useDisclosure(false);

    return (
        <>
            <EventCard
                eventType={event.entryType}
                middle={[
                    <EventDetails event={event} />,
                    <EventNotes event={event} />,
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
