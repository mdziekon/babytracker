export const isNotInFuture =
    (params?: { errorMessage?: string }) => (value: Date | undefined) => {
        if (!value) {
            return;
        }
        if (value.getTime() > Date.now()) {
            return params?.errorMessage ?? 'Date cannot be in the future';
        }
    };
