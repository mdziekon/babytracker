import { useParams } from 'react-router';
import { DiaperChangeEvent } from './DiaperChangeEvent/DiaperChangeEvent';

export const EventEditor = () => {
    const { eventType } = useParams<{ eventType: string }>();

    if (!eventType) {
        throw new Error('Missing event type');
    }

    if (eventType === 'DiaperChange') {
        return <DiaperChangeEvent />;
    }

    throw new Error('Unknown event type');
};
