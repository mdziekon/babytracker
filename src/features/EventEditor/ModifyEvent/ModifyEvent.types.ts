import { LogEntry } from '../../../common/store/types/storeData.types';

export type EventModifier = (event: LogEntry) => LogEntry;

export type RegisterEventModifier = (
    name: string,
    modifier: EventModifier
) => () => void;
