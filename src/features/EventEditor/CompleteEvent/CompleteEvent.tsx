import { Button, Text } from '@mantine/core';
import { LogEntry } from '../../../common/store/store.types';
import { EventCard } from '../EventCard/EventCard';
import { EventDetails } from '../EventDetails/EventDetails';
import { useDisclosure } from '@mantine/hooks';
import { EntryDeleteModal } from '../../../common/features/EntryDeleteModal/EntryDeleteModal';
import { useNavigate } from 'react-router';
import { IconTrash } from '@tabler/icons-react';
import { EventNotes } from '../EventNotes/EventNotes';

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
                    <>
                        <Button
                            variant="light"
                            color="red"
                            fullWidth
                            onClick={openConfirmDelete}
                        >
                            <IconTrash />
                            <Text component="span" ml="0.25rem">
                                Delete entry
                            </Text>
                        </Button>
                    </>
                }
            />

            <EntryDeleteModal
                entry={event}
                isModalOpen={isConfirmDeleteOpen}
                onModalClose={closeConfirmDelete}
                onEntryDeleted={() => {
                    // TODO: This interaction causes error due to EventEditor missing id
                    void navigate('/log');
                }}
            />
        </>
    );
};
