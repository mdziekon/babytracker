import { Button } from '@mantine/core';
import { useAppStore } from '../../../common/store/store';

export const ResetDataButton = () => {
    const resetData = useAppStore((state) => state.meta.resetData);

    const handleResetData = () => {
        const hasConfirmed = confirm('Are you sure?');

        if (!hasConfirmed) {
            return;
        }

        resetData();
    };

    return (
        <Button variant="filled" color="red" onClick={handleResetData}>
            Reset
        </Button>
    );
};
