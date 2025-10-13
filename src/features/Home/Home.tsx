import { Text, Title } from '@mantine/core';
import classes from './Home.module.css';
import { ActionsGridCard } from './ActionsGridCard';
import { ComponentProps } from 'react';
import { EntryType } from '../../common/store/types/storeData.types';
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
    // Row #1
    {
        entryType: EntryType.BreastFeeding,
    },
    {
        entryType: EntryType.BottleFeeding,
    },
    {
        entryType: EntryType.MilkPumping,
    },
    // Row #2
    {
        entryType: EntryType.DiaperChange,
    },
    {
        entryType: EntryType.Sleep,
    },
    {
        entryType: EntryType.Meal,
    },
    // Row #3
    {
        entryType: EntryType.Walk,
    },
    {
        entryType: EntryType.BellyPosition,
    },
    undefined,
    // Row #4
    {
        entryType: EntryType.Bath,
    },
    {
        entryType: EntryType.WeightMeasurement,
    },
    undefined,
    // Row #5
    {
        entryType: EntryType.Medicine,
    },
    {
        entryType: EntryType.DoctorsAppointment,
    },
    {
        entryType: EntryType.Sickness,
    },
    // Row #6
    {
        entryType: EntryType.Other,
    },
] satisfies ComponentProps<typeof ActionsGridCard>['actions'];
