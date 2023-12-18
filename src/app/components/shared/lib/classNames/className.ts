// cls главный класс
// mods - объкт как ключ название и булеан флаг
// additional - массив дополнительных классов

export type Mods = Record<string, boolean | string | undefined | number>;

export function classNames(cls: string, mods?: Mods, additional?: (string | undefined)[]):string {

    return [
        cls,
        additional?.filter(Boolean),
        mods && Object.entries(mods)
                .filter(([className, value]) => Boolean(value))
                .map(([className, value]) => className)
    ].join(' ')
}


// return [
//     cls,
//     ...additional.filter(Boolean),
//     ...Object.entries(mods)
//         .filter(([className, value]) => Boolean(value))
//         .map(([className, value]) => className),
// ].join(' ');