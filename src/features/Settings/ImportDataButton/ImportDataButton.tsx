import { Button, FileButton } from '@mantine/core';
import { StoreData } from '../../../common/store/types/storeData.types';
import { useAppStore } from '../../../common/store/store';

export const ImportDataButton = () => {
    const mergeData = useAppStore((state) => state.meta.mergeData);

    const handleImportData = async (file: File) => {
        const newData = await readStoreDataFromFile(file);

        mergeData(newData);
    };

    return (
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
    );
};

const readStoreDataFromFile = async (file: File) => {
    const reader = new FileReader();

    const newData = await new Promise<StoreData>((resolve, reject) => {
        reader.onload = function (event) {
            try {
                if (typeof event.target?.result !== 'string') {
                    throw new Error('not string');
                }
                const dataJSON = JSON.parse(event.target.result) as StoreData;

                resolve(dataJSON);
            } catch (error) {
                console.error(error);

                reject(new Error());
            }
        };

        reader.readAsText(file);
    });

    return newData;
};
