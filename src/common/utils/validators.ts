export const isNotAfter =
    (inputDate: Date | undefined, params?: { errorMessage?: string }) =>
    (value: Date | undefined) => {
        if (!value || !inputDate) {
            return;
        }
        if (value.getTime() > inputDate.getTime()) {
            return (
                params?.errorMessage ?? 'Date cannot be after the input date'
            );
        }
    };

export const isNotInFuture =
    (params?: { errorMessage?: string }) => (value: Date | undefined) => {
        return isNotAfter(new Date(), {
            errorMessage: 'Date cannot be in the future',
            ...params,
        })(value);
    };
