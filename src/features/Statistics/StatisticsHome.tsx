import { Card, Group, Text, Title } from '@mantine/core';
import classes from './Statistics.module.css';
import {
    ActionProps,
    ActionsGrid,
} from '../../common/features/ActionsGrid/ActionsGrid';
import { IconWeight } from '@tabler/icons-react';
import { EntryType } from '../../common/store/types/storeData.types';
import { mapEntryTypeToColor } from '../../common/utils/entryMappers';
import { routes } from '../../common/routes';

export const StatisticsHome = () => {
    const actions = [
        {
            title: 'Weight',
            icon: IconWeight,
            color: mapEntryTypeToColor(EntryType.WeightMeasurement),
            linkTarget: routes.statisticsWeight,
        },
    ] satisfies ActionProps[];

    return (
        <>
            <Title className={classes.title} ta="center" mt={16}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Statistics
                </Text>
            </Title>
            <Card withBorder radius="md" className={classes.card} mt={'2rem'}>
                <Group justify="space-between">
                    <Text fs="italic" className={classes.cardTitle}>
                        {/* TODO: Localize */}
                        Select statistics to display
                    </Text>
                </Group>
                <ActionsGrid actions={actions} />
            </Card>
        </>
    );
};
