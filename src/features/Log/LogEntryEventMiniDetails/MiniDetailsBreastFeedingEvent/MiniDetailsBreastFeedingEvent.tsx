import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { IconBrandMcdonalds } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsBreastFeedingEventProps {
    event: LogEntry & { entryType: EntryType.BreastFeeding };
}

export const MiniDetailsBreastFeedingEvent = (
    props: MiniDetailsBreastFeedingEventProps
) => {
    const { event } = props;

    const whichBreast = (() => {
        switch (event.params.type) {
            case 'LEFT_BREAST':
                return 'Left breast';
            case 'RIGHT_BREAST':
                return 'Right breast';
            case 'UNSPECIFIED':
                return 'Unspecified';
        }
    })();

    return (
        <>
            <MiniDetailsEntry
                icon={<IconBrandMcdonalds title="Breast" />}
                title={<>{whichBreast}</>}
            />
        </>
    );
};
