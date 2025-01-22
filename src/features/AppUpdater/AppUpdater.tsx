import { useCallback, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { notifications } from '@mantine/notifications';
import { Box, Button } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export const AppUpdater = () => {
    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line prefer-template, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-base-to-string
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const handleUpdateClicked = useCallback(async () => {
        notifications.update({
            id: notificationId,
            title: 'Updating application',
            message: 'Please wait...',
            loading: true,
        });

        await updateServiceWorker(true);

        notifications.update({
            id: notificationId,
            title: 'Update complete',
            message: 'Application will reload shortly...',
            icon: <IconCheck size={20} />,
            color: 'teal',
        });
    }, [updateServiceWorker]);

    useEffect(() => {
        if (!needRefresh) {
            return;
        }

        notifications.show({
            id: notificationId,
            title: 'Update available',
            message: (
                <Box>
                    <Box>
                        New application update is available and ready to be
                        applied.
                    </Box>
                    <Box>
                        <Button onClick={() => void handleUpdateClicked()}>
                            Update
                        </Button>
                    </Box>
                </Box>
            ),
        });
    }, [needRefresh, handleUpdateClicked]);

    return null;
};

const notificationId = 'app-updater--available';
