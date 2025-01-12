import { ObjectWithExactlyProps, ObjectWithProps } from '../utils/genericTypes';
import { LogEntry } from './store.types';

type WithTimedLogParams<T> = T extends {
    params: ObjectWithProps<
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        infer _U,
        { startedAt: string; endedAt?: string }
    >;
}
    ? T
    : never;
export type TimedLogEntries = WithTimedLogParams<LogEntry>;
export type TimedLogEntryTypes = TimedLogEntries['entryType'];

type WithBareTimedLogParams<T> = T extends {
    params: ObjectWithExactlyProps<
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        infer _U,
        { startedAt: string; endedAt?: string }
    >;
}
    ? T
    : never;
type BareTimedLogEntries = WithBareTimedLogParams<LogEntry>;
export type BareTimedLogEntryTypes = BareTimedLogEntries['entryType'];
