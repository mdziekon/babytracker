import { EntryType, LogEntry } from '../../../../common/store/store.types';
import {
    IconAbacus,
    IconMedicalCrossCircle,
    IconPillFilled,
} from '@tabler/icons-react';
import { MiniDetailsEntry } from '../MiniDetailsEntry/MiniDetailsEntry';
import { NumberFormatter } from '@mantine/core';
import { mapMedicineDoseTypeToSuffix } from '../../../../common/utils/entryMappers';

interface MiniMedicineEventProps {
    event: LogEntry & { entryType: EntryType.Medicine };
}

export const MiniMedicineEvent = (props: MiniMedicineEventProps) => {
    const { event } = props;

    return (
        <>
            {event.params.medicineName ? (
                <MiniDetailsEntry
                    icon={<IconPillFilled title="Medicine name" />}
                    title={<>{event.params.medicineName}</>}
                />
            ) : (
                <MiniDetailsEntry
                    icon={
                        <IconMedicalCrossCircle title="Medicine active substance" />
                    }
                    title={<>{event.params.medicineActiveSubstance}</>}
                />
            )}

            <MiniDetailsEntry
                icon={<IconAbacus title="Medicine dose" />}
                title={
                    <NumberFormatter
                        thousandSeparator=" "
                        suffix={` ${mapMedicineDoseTypeToSuffix(event.params.doseType)}`}
                        value={event.params.doseValue}
                    />
                }
            />
        </>
    );
};
