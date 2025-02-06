import { v4 as uuidv4 } from 'uuid';
import {
    EntryMetadata,
    EntryVariants,
    LogEntry,
} from './types/storeData.types';

export const createNewEventMetadata = (): LogEntry['metadata'] => {
    return {
        uid: uuidv4(),
        createdAt: new Date().toISOString(),
        modifications: [],
    };
};

export const createNewEvent = <EntryVariant extends EntryVariants>(
    creator: (props: { metadata: EntryMetadata }) => EntryVariant
): ReturnType<typeof creator> & { metadata: EntryMetadata } => {
    const metadata = createNewEventMetadata();

    return {
        metadata,
        ...creator({ metadata }),
    };
};
