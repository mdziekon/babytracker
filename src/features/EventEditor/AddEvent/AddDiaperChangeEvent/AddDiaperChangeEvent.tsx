import { Box } from '@mantine/core';
import { useAppStore } from '../../../../common/store/store';
import { EntryType } from '../../../../common/store/store.types';
import { useNavigate } from 'react-router';
import { EventCard } from '../../common/EventCard/EventCard';
import { useState } from 'react';
import { ResponsiveButton } from '../../../../common/design/ResponsiveButton';
import { createNewEvent } from '../../../../common/store/store.utils';
import { routes } from '../../../../common/routes';
import { RecentEvents } from '../../common/RecentEvents/RecentEvents';
import { DiaperChangeSelector, DiaperChangeType } from './DiaperChangeSelector';

const eventType = EntryType.DiaperChange;

export const AddDiaperChangeEvent = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const [reason, setReason] = useState<DiaperChangeType>('STOOL_AND_URINE');

    const handleAddEvent = () => {
        const newEntry = addEntry(
            createNewEvent(() => {
                return {
                    entryType: eventType,
                    params: {
                        reason,
                    },
                };
            })
        );

        void navigate(routes.eventView(newEntry.metadata.uid));
    };

    const middle = (
        <>
            <DiaperChangeSelector
                defaultOption={reason}
                onOptionChange={setReason}
            />
        </>
    );
    const actions = (
        <>
            <ResponsiveButton
                variant="primary"
                fullWidth
                onClick={handleAddEvent}
            >
                Add event
            </ResponsiveButton>
        </>
    );

    return (
        <>
            <EventCard eventType={eventType} middle={middle} footer={actions} />
            <Box mt={64}>
                <RecentEvents eventType={eventType} />
            </Box>
        </>
    );
};
