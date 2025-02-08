import { Alert, Box, Button, Stack, Text, Title } from '@mantine/core';
import classes from './Statistics.module.css';
import { WeightCentileChart } from './WeightCentileChart';
import { useAppStore } from '../../common/store/store';
import { EntryType } from '../../common/store/types/storeData.types';
import dayjs from 'dayjs';
import { IconInfoCircle } from '@tabler/icons-react';
import { Link } from 'react-router';
import { routes } from '../../common/routes';

export const WeightStatistics = () => {
    const entries = useAppStore((state) => state.data.logs);
    const babyInfo = useAppStore((state) => state.data.babyInfo);

    const weightEntries = entries.filter(
        (entry) => entry.entryType === EntryType.WeightMeasurement
    );

    return (
        <>
            <Title className={classes.title} ta="center" mt={16}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Weight Statistics
                </Text>
            </Title>
            {babyInfo ? (
                <WeightCentileChart
                    entries={weightEntries}
                    gender={babyInfo.gender}
                    dateOfBirth={dayjs(babyInfo.dateOfBirth)}
                />
            ) : (
                <Alert
                    mt="lg"
                    variant="light"
                    color="yellow"
                    title="Missing info"
                    icon={<IconInfoCircle />}
                >
                    <Stack gap={24}>
                        <Box>
                            It seems you've not provided your baby's info
                            required to calculate weight statistics.
                        </Box>
                        <Box>
                            <Button
                                component={Link}
                                to={routes.settingsBabyInfo}
                                variant="filled"
                                color="primary"
                            >
                                Edit info
                            </Button>
                        </Box>
                    </Stack>
                </Alert>
            )}
        </>
    );
};
