import { Text, Title } from '@mantine/core';
import classes from './Home.module.css';
import { ActionsGridCard } from './ActionsGridCard';
import { ComponentProps } from 'react';
import { EntryType } from '../../common/store/store.types';

export const Home = () => {
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
            <ActionsGridCard actions={actions} actionsInProgress={1} />
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
] satisfies ComponentProps<typeof ActionsGridCard>['actions'];
