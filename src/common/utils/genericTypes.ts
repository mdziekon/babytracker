export type ObjectWithProps<T, Props> = T extends Props ? T : never;

export type ObjectWithExactlyProps<T, Props> = T extends Props
    ? Exclude<keyof T, keyof Props> extends never
        ? T
        : never
    : never;
