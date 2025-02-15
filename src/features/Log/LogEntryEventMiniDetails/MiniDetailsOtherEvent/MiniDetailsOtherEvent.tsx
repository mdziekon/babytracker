import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { IconFileUnknown } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsOtherEventProps {
    event: LogEntry & { entryType: EntryType.Other };
}

export const MiniDetailsOtherEvent = (props: MiniDetailsOtherEventProps) => {
    const { event } = props;

    return (
        <>
            <MiniDetailsEntry
                icon={<IconFileUnknown title="Subtype" />}
                title={<>{event.params.subtype}</>}
            />
        </>
    );
};
