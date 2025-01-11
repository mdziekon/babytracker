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
        .filter((entry) => !entry.params.endedAt).length;

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
        color: 'cyan',
    },
    {
        entryType: EntryType.BreastFeeding,
        color: 'lime',
        linkLocation: '/event/add/BreastFeeding',
    },
    undefined,
    {
        entryType: EntryType.DiaperChange,
        color: 'indigo',
        linkLocation: '/event/add/DiaperChange',
    },
    {
        entryType: EntryType.Sleep,
        color: 'violet',
        linkLocation: '/event/add/Sleep',
    },
    {
        entryType: EntryType.BellyPosition,
        color: 'pink',
        linkLocation: '/event/add/BellyPosition',
    },
    {
        entryType: EntryType.Walk,
        color: 'blue',
        linkLocation: '/event/add/Walk',
    },
    {
        entryType: EntryType.Bath,
        color: 'orange',
        linkLocation: '/event/add/Bath',
    },
    undefined,
    {
        entryType: EntryType.WeightMeasurement,
        color: 'green',
        linkLocation: '/event/add/WeightMeasurement',
    },
] satisfies ComponentProps<typeof ActionsGridCard>['actions'];
