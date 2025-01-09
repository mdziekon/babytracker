import { LogEntry } from '../store/store.types';

type ObjectWithProps<T, Props> = T extends Props ? T : never;

type WithTimedLogParams<T> = T extends {
    params: ObjectWithProps<
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        infer _U,
        { startedAt: string; endedAt?: string }
    >;
}
    ? T
    : never;
type TimedLogEntries = WithTimedLogParams<LogEntry>;

export const isTimedEntry = (entry: LogEntry): entry is TimedLogEntries => {
    return Boolean(
        (entry as LogEntry & { params: { startedAt: string } }).params.startedAt
    );
};
