export const Duration = (props: { duration: plugin.Duration }) => {
    return (
        <>
            {props.duration.hours() > 0 ? props.duration.format('HH[h] ') : ''}
            {props.duration.format('mm[m] ss[s]')}
        </>
    );
};
