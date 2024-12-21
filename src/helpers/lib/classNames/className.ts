// cls main class
// mods - object
// additional - array additional classes

export type Mods = Record<string, boolean | string | undefined | number>;

// export function classNames(cls: string, mods?: Mods, additional?: (string | undefined)[]):string {
export function classNames(cls: string, mods?: Mods, additional?: (string | undefined)[]):string {

    return [
        cls,
        additional?.filter(Boolean),
        mods && Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className, value]) => className)
    ].join(' ')
}
