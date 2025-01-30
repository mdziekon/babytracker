import { Button } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { useAppStore } from '../../../common/store/store';

export const ExportDataButton = () => {
    const data = useAppStore((state) => state.data);
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

    return (
        <Button
            component="a"
            ref={downloadElementRef}
            download={exportFilename}
            variant="filled"
            color="red"
        >
            Export
        </Button>
    );
};

const exportFilename = 'babytracker-data.json';
