import { Button, Card, Group, Text, Title } from '@mantine/core';
import classes from './Settings.module.css';
import { ImportDataButton } from './ImportDataButton/ImportDataButton';
import { ExportDataButton } from './ExportDataButton/ExportDataButton';
import { ResetDataButton } from './ResetDataButton/ResetDataButton';
import { Suspense } from 'react';
import { PersistenceIndicator } from './PersistenceIndicator/PersistenceIndicator';
import { Link } from 'react-router';
import { routes } from '../../common/routes';

export const Settings = () => {
    return (
        <>
            <Title className={classes.title} ta="center" mt={16}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Settings
                </Text>
            </Title>
            <Card withBorder radius="md" p="xl" className={classes.card}>
                <Group
                    justify="space-between"
                    className={classes.item}
                    wrap="nowrap"
                    gap="xl"
                >
                    <div>
                        <Text>Baby info</Text>
                        <Text size="xs" c="dimmed">
                            Display or modify info about your child
                        </Text>
                    </div>
                    <div>
                        <Button
                            component={Link}
                            to={routes.settingsBabyInfo}
                            variant="outline"
                            color="primary"
                        >
                            Edit info
                        </Button>
                    </div>
                </Group>
                <Group
                    justify="space-between"
                    className={classes.item}
                    wrap="nowrap"
                    gap="xl"
                >
                    <div>
                        <Text>Display options</Text>
                        <Text size="xs" c="dimmed">
                            Change language, units, date formats etc.
                        </Text>
                    </div>
                    <div>TBD...</div>
                </Group>
                <Group
                    justify="space-between"
                    className={classes.item}
                    wrap="nowrap"
                    gap="xl"
                >
                    <div>
                        <Text>Export data</Text>
                        <Text size="xs" c="dimmed">
                            Save all application data to a file
                        </Text>
                    </div>
                    <ExportDataButton />
                </Group>
                <Group
                    justify="space-between"
                    className={classes.item}
                    wrap="nowrap"
                    gap="xl"
                >
                    <div>
                        <Text>Import data</Text>
                        <Text size="xs" c="dimmed">
                            Load application data from a file
                            <br />& try to merge with existing data
                        </Text>
                    </div>

                    <ImportDataButton />
                </Group>
                <Group
                    justify="space-between"
                    className={classes.item}
                    wrap="nowrap"
                    gap="xl"
                >
                    <div>
                        <Text>Reset data</Text>
                        <Text size="xs" c="dimmed">
                            Remove all data & start fresh
                        </Text>
                    </div>

                    <ResetDataButton />
                </Group>
                <Group
                    justify="space-between"
                    className={classes.item}
                    wrap="nowrap"
                    gap="xl"
                >
                    <div>
                        <Text>App build</Text>
                        <Text size="xs" c="dimmed">
                            {import.meta.env.VITE_APP_COMMIT_DATE} (
                            {import.meta.env.VITE_APP_COMMIT_HASH})
                        </Text>
                    </div>
                    <div></div>
                </Group>
                <Group
                    justify="space-between"
                    className={classes.item}
                    wrap="nowrap"
                    gap="xl"
                >
                    <div>
                        <Text>Persistence</Text>
                        <Text size="xs" c="dimmed">
                            <Suspense fallback="Checking...">
                                <PersistenceIndicator />
                            </Suspense>
                        </Text>
                    </div>
                    <div></div>
                </Group>
            </Card>
        </>
    );
};
