import { Button, Group, Modal } from '@mantine/core';
import dayjs from 'dayjs';
import { DateISO8601, LogEntry } from '../../store/store.types';
import { useAppStore } from '../../store/store';
import { mapEntryTypeToName } from '../../utils/entryMappers';

interface EntryDeleteModalProps {
    entry: LogEntry;
    isModalOpen: boolean;
    onEntryDeleted?: () => void;
    onModalClose: () => void;
}

export const EntryDeleteModal = (props: EntryDeleteModalProps) => {
    const { entry, isModalOpen, onEntryDeleted, onModalClose } = props;
    const deleteEntry = useAppStore((store) => store.api.deleteEntry);

    const handleDeleteEntry = () => {
        deleteEntry(entry.metadata.uid);

        onModalClose();
        onEntryDeleted?.();
    };

    const entryStartTime = (() => {
        const hasStartedAt = (
            entry: LogEntry
        ): entry is LogEntry & { params: { startedAt: DateISO8601 } } => {
            return Object.hasOwn(entry.params ?? {}, 'startedAt');
        };

        if (hasStartedAt(entry)) {
            return entry.params.startedAt;
        }

        return entry.metadata.createdAt;
    })();

    return (
        <>
            <Modal
                opened={isModalOpen}
                onClose={onModalClose}
                title={<strong>Delete selected entry?</strong>}
            >
                Are you sure you want to delete entry{' '}
                <strong>{mapEntryTypeToName(entry.entryType)}</strong> created{' '}
                <strong>
                    {dayjs(entryStartTime).format('YYYY-MM-DD HH:mm')}
                </strong>
                ? This action cannot be undone.
                <Group mt="lg" justify="flex-end">
                    <Button onClick={onModalClose} variant="default">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteEntry} color="red">
                        Delete
                    </Button>
                </Group>
            </Modal>
        </>
    );
};
