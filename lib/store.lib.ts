/*
 * Copyright (©) 14.10.2021, 12:05. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const assignStore = (state: any, obj: any): any => {
    const newObj = {}

    Object.keys(state).forEach((keyState) => {
        const prop = obj[keyState]

        // @ts-ignore
        prop && (newObj[keyState] = prop)
    })

    return newObj
}
