import {
    EntryType,
    LogEntry,
} from '../../../../common/store/types/storeData.types';
import { IconStethoscope } from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';

interface MiniDetailsDoctorsAppointmentEventProps {
    event: LogEntry & { entryType: EntryType.DoctorsAppointment };
}

export const MiniDetailsDoctorsAppointmentEvent = (
    props: MiniDetailsDoctorsAppointmentEventProps
) => {
    const { event } = props;

    return (
        <>
            <MiniDetailsEntry
                icon={<IconStethoscope title="Visit type" />}
                title={<>{event.params.visitType}</>}
            />
        </>
    );
};
