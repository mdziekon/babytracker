import { EntryType, LogEntry } from '../../../../common/store/store.types';
import { IconDroplets, IconPoo, IconQuestionMark } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsDiaperChangeEventProps {
    event: LogEntry & { entryType: EntryType.DiaperChange };
}

export const MiniDetailsDiaperChangeEvent = (
    props: MiniDetailsDiaperChangeEventProps
) => {
    const { event } = props;

    return (
        <>
            {(event.params.reason === 'STOOL' ||
                event.params.reason === 'STOOL_AND_URINE') && (
                <MiniDetailsEntry icon={<IconPoo />} title={<>Stool</>} />
            )}
            {(event.params.reason === 'URINE' ||
                event.params.reason === 'STOOL_AND_URINE') && (
                <MiniDetailsEntry icon={<IconDroplets />} title={<>Urine</>} />
            )}
            {event.params.reason === 'OTHER' && (
                <MiniDetailsEntry
                    icon={<IconQuestionMark />}
                    title={<>Other</>}
                />
            )}
        </>
    );
};
