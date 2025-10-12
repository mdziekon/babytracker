import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { IconCarrot } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsMealEventProps {
    event: LogEntry & { entryType: EntryType.Meal };
}

export const MiniDetailsMealEvent = (props: MiniDetailsMealEventProps) => {
    const { event } = props;

    return (
        <>
            <MiniDetailsEntry
                icon={<IconCarrot title="Meal name" />}
                title={<>{event.params.mealName}</>}
            />
        </>
    );
};
