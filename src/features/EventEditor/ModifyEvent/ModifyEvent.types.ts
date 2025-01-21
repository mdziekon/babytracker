import { LogEntry } from '../../../common/store/store.types';

export type EventModifier = (event: LogEntry) => LogEntry;

export type RegisterEventModifier = (
    name: string,
    modifier: EventModifier
) => () => void;
