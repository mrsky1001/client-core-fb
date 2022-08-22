// /*
//  * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
//  */
//
// import { Extension } from '@tiptap/core'
// import { Plugin } from 'prosemirror-state'
// import findColors from './find-colors'
//
// export const ColorHighlighter = Extension.create({
//     name: 'colorHighlighter',
//
//     addProseMirrorPlugins() {
//         return [
//             new Plugin({
//                 state: {
//                     init(_: Plugin, { doc }: { doc: any }) {
//                         return findColors(doc)
//                     },
//                     apply(transaction: any, oldState: any) {
//                         return transaction.docChanged ? findColors(transaction.doc) : oldState
//                     },
//                 },
//                 props: {
//                     decorations(state: any): any {
//                         return this.getState(state)
//                     },
//                 },
//             }),
//         ]
//     },
// })
