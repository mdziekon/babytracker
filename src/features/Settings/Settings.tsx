import { Button, Card, FileButton, Group, Text, Title } from '@mantine/core';
import classes from './Settings.module.css';
import { useAppStore } from '../../common/store/store';
import { StoreData } from '../../common/store/store.types';
import { useEffect, useRef } from 'react';

const exportFilename = 'babytracker-data.json';

export const Settings = () => {
    const data = useAppStore((state) => state.data);
    const mergeData = useAppStore((state) => state.meta.mergeData);
    const resetData = useAppStore((state) => state.meta.resetData);
    const downloadElementRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const a = downloadElementRef.current;

        if (!a) {
            return;
        }

        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
        });
        a.href = window.URL.createObjectURL(blob);
        a.download = exportFilename;
        a.dataset.downloadurl = ['application/json', a.download, a.href].join(
            ':'
        );
    }, [data]);

    const handleResetData = () => {
        const hasConfirmed = confirm('Are you sure?');

        if (!hasConfirmed) {
            return;
        }

        resetData();
    };

    const handleImportData = async (file: File) => {
        const reader = new FileReader();

        const newData = await new Promise<StoreData>((resolve) => {
            reader.onload = function (event) {
                try {
                    if (typeof event.target?.result !== 'string') {
                        throw new Error('not string');
                    }
                    const dataJSON = JSON.parse(
                        event.target.result
                    ) as StoreData;

                    resolve(dataJSON);
                } catch (error) {
                    console.error(error);
                }
            };

            reader.readAsText(file);
        });

        mergeData(newData);
    };

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
                    <Button
                        component="a"
                        ref={downloadElementRef}
                        download={exportFilename}
                        variant="filled"
                        color="red"
                    >
                        Export
                    </Button>
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

                    <FileButton
                        onChange={(file) => {
                            if (!file) {
                                return;
                            }
                            void handleImportData(file);
                        }}
                        accept="application/json"
                    >
                        {(props) => (
                            <Button variant="filled" color="indigo" {...props}>
                                Import
                            </Button>
                        )}
                    </FileButton>
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

                    <Button
                        variant="filled"
                        color="red"
                        onClick={handleResetData}
                    >
                        Reset
                    </Button>
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
            </Card>
        </>
    );
};
