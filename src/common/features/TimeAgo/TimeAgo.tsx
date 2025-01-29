export const TimeAgo = (props: { duration: plugin.Duration }) => {
    if (props.duration.asHours() > 24) {
        return null;
    }

    return (
        <>
            {props.duration.hours() > 0 ? props.duration.format('HH[h] ') : ''}
            {props.duration.format('mm[m] ')}
            {'ago'}
        </>
    );
};
