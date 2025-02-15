import { LogEntry } from '../../../common/store/types/storeData.types';

export interface EventModifierOptions {
    /**
     * Do not trigger validation before applying changes.
     * Always returns `isValid = true`, as it no longer matters.
     */
    preventValidationTrigger?: boolean;
}

export type EventModifier = (
    event: LogEntry,
    options?: EventModifierOptions
) => {
    event: LogEntry;
    isValid: boolean;
};

export type RegisterEventModifier = (
    name: string,
    modifier: EventModifier,
    validate: () => { hasErrors: boolean }
) => () => void;
