import { Button, Group, Modal } from '@mantine/core';

interface EntryDeleteModalProps {
    isModalOpen: boolean;
    onModificationsCancelled?: () => void;
    onModalClose: () => void;
}

export const ConfirmCancelModal = (props: EntryDeleteModalProps) => {
    const { isModalOpen, onModificationsCancelled, onModalClose } = props;

    const handleCancelModifications = () => {
        onModalClose();
        onModificationsCancelled?.();
    };

    return (
        <>
            <Modal
                opened={isModalOpen}
                onClose={onModalClose}
                title={<strong>Cancel entry modification?</strong>}
            >
                Are you sure you want to cancel entry modification? Changes will
                be lost.
                <Group mt="lg" justify="flex-end">
                    <Button onClick={onModalClose} variant="default">
                        Stay
                    </Button>
                    <Button onClick={handleCancelModifications} color="orange">
                        Cancel modifications
                    </Button>
                </Group>
            </Modal>
        </>
    );
};
