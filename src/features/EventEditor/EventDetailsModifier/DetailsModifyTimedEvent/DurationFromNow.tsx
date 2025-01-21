import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';

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

export const Duration = (props: { duration: plugin.Duration }) => {
    return (
        <>
            {props.duration.hours() > 0 ? props.duration.format('HH[h] ') : ''}
            {props.duration.format('mm[m] ss[s]')}
        </>
    );
};
