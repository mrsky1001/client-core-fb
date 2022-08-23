/*
 * Copyright (c) 29.08.2021, 20:54 $name
 */

export const listPageCardRtbId = [
    'yandex_rtb_R-A-1248338-2',
    'yandex_rtb_R-A-1248338-3',
    'yandex_rtb_R-A-1248338-4',
    'yandex_rtb_R-A-1248338-5',
    'yandex_rtb_R-A-1248338-6',
    'yandex_rtb_R-A-1248338-7',
]

interface IRTB {
    renderTo: string
    blockId: string
}

export const listRtbRender = [
    { renderTo: 'yandex_rtb_R-A-1248338-2', blockId: 'R-A-1248338-2' },
    { renderTo: 'yandex_rtb_R-A-1248338-3', blockId: 'R-A-1248338-3' },
    { renderTo: 'yandex_rtb_R-A-1248338-4', blockId: 'R-A-1248338-4' },
    { renderTo: 'yandex_rtb_R-A-1248338-5', blockId: 'R-A-1248338-5' },
    { renderTo: 'yandex_rtb_R-A-1248338-6', blockId: 'R-A-1248338-6' },
    { renderTo: 'yandex_rtb_R-A-1248338-7', blockId: 'R-A-1248338-7' },
    { renderTo: 'yandex_rtb_R-A-1248338-8', blockId: 'R-A-1248338-8' },
    { renderTo: 'yandex_rtb_R-A-1248338-9', blockId: 'R-A-1248338-9' },
    { renderTo: 'yandex_rtb_R-A-1248338-10', blockId: 'R-A-1248338-10' },
    { renderTo: 'yandex_rtb_R-A-1248338-11', blockId: 'R-A-1248338-11' },
    { renderTo: 'yandex_rtb_R-A-1248338-13', blockId: 'R-A-1248338-13' },
    { renderTo: 'yandex_rtb_R-A-1248338-14', blockId: 'R-A-1248338-14' },
    { renderTo: 'yandex_rtb_R-A-1248338-15', blockId: 'R-A-1248338-15' },
]

export const connectOneAds = (rtbId: string): void => {
    const rtb = listRtbRender.find((r: IRTB) => r.renderTo === rtbId)
    const blockId = rtb ? rtb.blockId : null

    if (blockId) {
        // @ts-ignore
        window.yaContextCb.push(() => {
            // @ts-ignore
            Ya.Context.AdvManager.render({
                renderTo: rtbId,
                blockId: blockId,
            })
        })
    }
}

export const connectAds = (): void => {
    listRtbRender.forEach((rtb) => {
        // @ts-ignore
        window.yaContextCb.push(() => {
            // @ts-ignore
            Ya.Context.AdvManager.render({
                renderTo: rtb.renderTo,
                blockId: rtb.blockId,
            })
        })
    })
}
