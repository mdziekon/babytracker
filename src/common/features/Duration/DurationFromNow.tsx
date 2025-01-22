import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Duration } from './Duration';

export const DurationFromNow = (props: { startedAt: dayjs.Dayjs }) => {
    const [duration, setDuration] = useState<plugin.Duration>(() =>
        dayjs.duration(dayjs().diff(props.startedAt))
    );
    const animationHandle = useRef<number>(undefined);

    const runTimer = useCallback(() => {
        const nextDuration = dayjs.duration(dayjs().diff(props.startedAt));

        setDuration((prevDuration) => {
            const prevDurationInSeconds = Math.ceil(prevDuration.asSeconds());
            const nextDurationInSeconds = Math.ceil(nextDuration.asSeconds());

            if (prevDurationInSeconds === nextDurationInSeconds) {
                return prevDuration;
            }

            return nextDuration;
        });

        animationHandle.current = requestAnimationFrame(runTimer);
    }, [props.startedAt]);

    useEffect(() => {
        animationHandle.current = requestAnimationFrame(runTimer);

        return () => {
            if (animationHandle.current !== undefined) {
                cancelAnimationFrame(animationHandle.current);
            }
        };
    }, [runTimer]);

    return <Duration duration={duration} />;
};
