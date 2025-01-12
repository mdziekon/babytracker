import { TimedLogEntries } from '../store/store.helperTypes';
import { LogEntry } from '../store/store.types';

export const isTimedEntry = (entry: LogEntry): entry is TimedLogEntries => {
    return Boolean(
        (entry as LogEntry & { params?: { startedAt?: string } }).params
            ?.startedAt
    );
};
