import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { IconReportMedical } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsSicknessEventProps {
    event: LogEntry & { entryType: EntryType.Sickness };
}

export const MiniDetailsSicknessEvent = (
    props: MiniDetailsSicknessEventProps
) => {
    const { event } = props;

    return (
        <>
            <MiniDetailsEntry
                icon={<IconReportMedical title="Diagnosis" />}
                title={<>{event.params.diagnosis}</>}
            />
        </>
    );
};
