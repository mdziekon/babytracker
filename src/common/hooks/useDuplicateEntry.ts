import { useCallback } from 'react';
import { useAppStore } from '../store/store';
import { useNavigate } from 'react-router';
import { LogEntry } from '../store/types/storeData.types';
import { createNewEvent } from '../store/store.utils';
import { routes } from '../routes';
import { isTimedEntry } from '../utils/entryGuards';

export const useDuplicateEntry = () => {
    const addEntry = useAppStore((store) => store.api.addEntry);
    const navigate = useNavigate();

    const duplicateEntry = useCallback(
        (event: LogEntry) => {
            if (isTimedEntry(event)) {
                console.warn(
                    'useDuplicateEntry: TimedEntries are not currently supported, ignoring...'
                );
                return;
            }

            const newEntry = addEntry(
                createNewEvent(({ metadata }) => {
                    const newEvent = window.structuredClone(event);

                    newEvent.metadata = metadata;

                    return newEvent;
                })
            );

            void navigate(routes.eventView(newEntry.metadata.uid), {
                // TODO: This probably should be configurable?
                replace: true,
            });
        },
        [addEntry, navigate]
    );

    return {
        duplicateEntry,
    };
};
