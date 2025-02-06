import { Group, NumberFormatter, Text } from '@mantine/core';
import {
    EntryType,
    LogEntry,
} from '../../../../../common/store/types/storeData.types';
import {
    IconAbacus,
    IconMedicalCrossCircle,
    IconPillFilled,
} from '@tabler/icons-react';
import { mapMedicineDoseTypeToSuffix } from '../../../../../common/utils/entryMappers';

interface DetailsMedicineEventProps {
    event: LogEntry & { entryType: EntryType.Medicine };
}

export const DetailsMedicineEvent = (props: DetailsMedicineEventProps) => {
    const { event } = props;

    return (
        <>
            <Group>
                <IconPillFilled size={16} stroke={1.5} />
                <Text>Medicine name: {event.params.medicineName}</Text>
            </Group>
            <Group>
                <IconMedicalCrossCircle size={16} stroke={1.5} />
                <Text>
                    Medicine active substance:{' '}
                    {event.params.medicineActiveSubstance}
                </Text>
            </Group>
            <Group>
                <IconAbacus size={16} stroke={1.5} />
                <Text>
                    Medicine dose:{' '}
                    <NumberFormatter
                        thousandSeparator=" "
                        suffix={` ${mapMedicineDoseTypeToSuffix(event.params.doseType)}`}
                        value={event.params.doseValue}
                    />
                </Text>
            </Group>
        </>
    );
};
