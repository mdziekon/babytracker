import { Group, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { IconStethoscope } from '@tabler/icons-react';

interface DetailsDoctorsAppointmentEventProps {
    event: LogEntry & { entryType: EntryType.DoctorsAppointment };
}

export const DetailsDoctorsAppointmentEvent = (
    props: DetailsDoctorsAppointmentEventProps
) => {
    const { event } = props;

    return (
        <>
            <Group>
                <IconStethoscope size={16} stroke={1.5} />
                <Text>Visit type: {event.params.visitType}</Text>
            </Group>
        </>
    );
};
