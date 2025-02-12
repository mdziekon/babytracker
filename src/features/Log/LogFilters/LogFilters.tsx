import { Affix, Box, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons-react';
import { LogTypeCombobox } from './LogTypeCombobox';
import { useCallback, useEffect, useState } from 'react';

interface LogFiltersProps {
    onChange: (filters: LogFiltersState) => void;
}

export interface LogFiltersState {
    eventType: string[];
    limit?: number;
}

export const defaultFilters: LogFiltersState = {
    eventType: [] as string[],
    limit: 0,
};

export const LogFilters = (props: LogFiltersProps) => {
    const { onChange } = props;

    const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
        useDisclosure(false);

    const [filters, setFilters] = useState(defaultFilters);
    const [prevFilters, setPrevFilters] = useState(filters);

    useEffect(() => {
        if (filters !== prevFilters) {
            setPrevFilters(filters);
            onChange(filters);
        }
    }, [onChange, filters, prevFilters]);

    const onLogTypeChange = useCallback((value: string[]) => {
        setFilters((prev) => {
            return {
                ...prev,
                eventType: value,
            };
        });
    }, []);

    const appliedFiltersCount = filters.eventType.length;
    const hasAppliedFilters = appliedFiltersCount !== 0;

    return (
        <>
            <Drawer
                opened={isDrawerOpen}
                onClose={closeDrawer}
                keepMounted
                title="Filters"
                position="bottom"
            >
                <LogTypeCombobox onChange={onLogTypeChange} />
            </Drawer>

            {/* TODO: Figure out better placement for desktop */}
            <Affix
                hidden={isDrawerOpen}
                position={{ right: 0 + 8, bottom: 60 + 8 }}
            >
                <Button
                    leftSection={<IconFilter size={16} />}
                    color={hasAppliedFilters ? 'blue' : 'gray'}
                    onClick={openDrawer}
                    styles={{
                        root: {
                            boxShadow: 'var(--mantine-shadow-md)',
                        },
                    }}
                >
                    Filters ({appliedFiltersCount})
                </Button>
            </Affix>
            <Box mb={36}></Box>
        </>
    );
};
