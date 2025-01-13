import { Text, Title } from '@mantine/core';
import classes from './Home.module.css';
import { ActionsGridCard } from './ActionsGridCard';
import { ComponentProps } from 'react';
import { EntryType } from '../../common/store/store.types';
import { useAppStore } from '../../common/store/store';
import { isTimedEntry } from '../../common/utils/entryGuards';
import { mapEntryTypeToColor } from '../../common/utils/entryMappers';

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
        linkLocation: '/event/add/BottleFeeding',
    },
    {
        entryType: EntryType.BreastFeeding,
        linkLocation: '/event/add/BreastFeeding',
    },
    undefined,
    {
        entryType: EntryType.DiaperChange,
        linkLocation: '/event/add/DiaperChange',
    },
    {
        entryType: EntryType.Sleep,
        linkLocation: '/event/add/Sleep',
    },
    {
        entryType: EntryType.BellyPosition,
        linkLocation: '/event/add/BellyPosition',
    },
    {
        entryType: EntryType.Walk,
        linkLocation: '/event/add/Walk',
    },
    {
        entryType: EntryType.Bath,
        linkLocation: '/event/add/Bath',
    },
    undefined,
    {
        entryType: EntryType.WeightMeasurement,
        linkLocation: '/event/add/WeightMeasurement',
    },
].map((action) => {
    if (!action) {
        return;
    }
    return {
        ...action,
        color: mapEntryTypeToColor(action.entryType),
    };
}) satisfies ComponentProps<typeof ActionsGridCard>['actions'];
