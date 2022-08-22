/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

import { Decoration, DecorationSet } from 'prosemirror-view'

export default (doc: any) => {
    const hexColor = /(#[0-9a-f]{3,6})\b/gi
    const decorations: any = []

    doc.descendants((node: any, position: any) => {
        if (!node.text) {
            return
        }

        Array.from(node.text.matchAll(hexColor)).forEach((match: any) => {
            const color = match[0]
            const index = match.index || 0
            const from = position + index
            const to = from + color.length
            const decoration = Decoration.inline(from, to, {
                class: 'color',
                style: `--color: ${color}`,
            })

            decorations.push(decoration)
        })
    })

    return DecorationSet.create(doc, decorations)
}
