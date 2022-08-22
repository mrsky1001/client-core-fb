/*
 * Copyright (c) 27.12.2021, 21:29  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

export const afterStartEditor = (keydownHandler: (e: KeyboardEvent) => void, onClick: (e: Event) => void) => {
    document.addEventListener('keydown', keydownHandler)

    const editorEl = document.getElementsByClassName('my-editor')[0]
    editorEl && editorEl.addEventListener('click', onClick)
}

export const beforeDestroyedEditor = (keydownHandler: (e: KeyboardEvent) => void, onClick: (e: Event) => void) => {
    document.removeEventListener('keydown', keydownHandler)

    const editorEl = document.getElementsByClassName('my-editor')[0]
    editorEl && editorEl.removeEventListener('click', onClick)
}
