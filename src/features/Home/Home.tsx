import { Text, Title } from '@mantine/core';
import classes from './Home.module.css';
import { ActionsGridCard } from './ActionsGridCard';
import { ComponentProps } from 'react';
import {
    IconBabyBottle,
    IconBrandMcdonalds,
    IconDiaper,
} from '@tabler/icons-react';

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
    { title: 'Bottle Feeding', icon: IconBabyBottle, color: 'cyan' },
    { title: 'Breast Feeding', icon: IconBrandMcdonalds, color: 'lime' },
    undefined,
    {
        title: 'Diaper change',
        icon: IconDiaper,
        color: 'indigo',
        linkLocation: '/event/add/DiaperChange',
    },
] satisfies ComponentProps<typeof ActionsGridCard>['actions'];
