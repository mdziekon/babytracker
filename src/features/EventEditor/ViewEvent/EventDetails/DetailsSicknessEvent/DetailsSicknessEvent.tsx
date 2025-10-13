import { Group, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import { IconReportMedical } from '@tabler/icons-react';

interface DetailsSicknessEventProps {
    event: LogEntry & { entryType: EntryType.Sickness };
}

export const DetailsSicknessEvent = (props: DetailsSicknessEventProps) => {
    const { event } = props;

    return (
        <>
            <Group>
                <IconReportMedical size={16} stroke={1.5} />
                <Text>Diagnosis: {event.params.diagnosis}</Text>
            </Group>
        </>
    );
};
