import { Text, Title } from '@mantine/core';
import classes from './Home.module.css';
import { ActionsGridCard } from './ActionsGridCard';
import { ComponentProps } from 'react';
import { EntryType } from '../../common/store/store.types';
import { useAppStore } from '../../common/store/store';
import { isTimedEntry } from '../../common/utils/entryGuards';

export const Home = () => {
    const events = useAppStore((store) => {
        return store.data.logs;
    });

    const actionsInProgress = events
        .filter(isTimedEntry)
        .filter((entry) => !entry.params.endedAt);

    return (
        <>
            <Title className={classes.title} ta="center" mt={'2rem'}>
                Welcome to{' '}
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    BabyTracker
                </Text>
            </Title>
            <ActionsGridCard
                actions={actions}
                actionsInProgress={actionsInProgress}
            />
        </>
    );
};

const actions = [
    {
        entryType: EntryType.BottleFeeding,
    },
    {
        entryType: EntryType.BreastFeeding,
    },
    undefined,
    {
        entryType: EntryType.DiaperChange,
    },
    {
        entryType: EntryType.Sleep,
    },
    {
        entryType: EntryType.BellyPosition,
    },
    {
        entryType: EntryType.Walk,
    },
    {
        entryType: EntryType.Bath,
    },
    undefined,
    {
        entryType: EntryType.WeightMeasurement,
    },
] satisfies ComponentProps<typeof ActionsGridCard>['actions'];
