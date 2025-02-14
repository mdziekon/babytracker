export const isNotNullable = <T>(
    value: T
): value is NonNullable<typeof value> => {
    return value !== null && value !== undefined;
};
