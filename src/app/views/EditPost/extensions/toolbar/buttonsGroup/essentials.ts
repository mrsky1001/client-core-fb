/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

export default (editor: any, callSelectImage: () => void) => [
    {
        buttons: [
            {
                icon: 'mdi-undo',
                title: 'Вернуть назад (Control Z , Cmd Z)',
                action: () => editor.chain().focus().undo().run(),
                isActive: () => '',
            },
            {
                icon: 'mdi-redo',
                title: 'Вернуть вперед(Control Shift Z, Cmd Shift Z)',
                action: () => editor.chain().focus().redo().run(),
                isActive: () => '',
            },
            {
                icon: 'mdi-minus',
                title: 'Горизонтальная линия',
                action: () => editor.chain().focus().setHorizontalRule().run(),
                isActive: () => '',
            },
            {
                icon: 'mdi-format-clear',
                title: 'Очистить форматирование',
                action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
                isActive: () => '',
            },
            {
                icon: 'mdi-image',
                title: 'Вставить изображение',
                isErrorNewPost: true,
                action: callSelectImage,
                isActive: () => '',
            },
        ],
    },
]
