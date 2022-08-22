/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

export default (editor: any) => [
    {
        buttons: [
            {
                icon: 'mdi-format-bold',
                title: 'Жирный(Control B, Cmd B)',
                action: () => editor.chain().focus().toggleBold().run(),
                isActive: () => editor.isActive('bold'),
            },
            {
                icon: 'mdi-format-italic',
                title: 'Курсив(Control I, Cmd I)',
                action: () => editor.chain().focus().toggleItalic().run(),
                isActive: () => editor.isActive('italic'),
            },
            {
                icon: 'mdi-format-underline',
                title: 'Подчеркивание(Control U, Cmd U)',
                action: () => editor.chain().focus().toggleUnderline().run(),
                isActive: () => editor.isActive('underline'),
            },
            {
                isSmall: true,
                icon: 'mdi-format-strikethrough-variant',
                title: 'Зачеркивание(Control Shift X, Cmd Shift X)',
                action: () => editor.chain().focus().toggleStrike().run(),
                isActive: () => editor.isActive('strike'),
            },
            {
                icon: 'mdi-code-parentheses',
                title: 'Текст в виде кода(Control E, Cmd E)',
                action: () => editor.chain().focus().toggleCode().run(),
                isActive: () => editor.isActive('code'),
            },
            {
                icon: 'mdi-link-variant',
                title: 'Вставить ссылку',
                action: () => {
                    const url = window.prompt('URL')

                    editor.chain().focus().toggleLink({ href: url }).run()
                },
                isActive: () => editor.isActive('link'),
            },
        ],
    },
    {
        isDropDown: true,
        title: 'Выделение цветом',
        icon: 'mdi-format-color-fill',
        buttons: [
            {
                icon: 'mdi-format-color-text',
                title: 'Красный',
                classes: 'red',
                action: () => editor.chain().focus().toggleHighlight({ color: '#F44336' }).run(),
                isActive: () => editor.isActive({ color: '#F44336' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Розовый',
                classes: 'pink',
                action: () => editor.chain().focus().toggleHighlight({ color: '#E91E63' }).run(),
                isActive: () => editor.isActive({ color: '#E91E63' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Сиреневый',
                classes: 'purple',
                action: () => editor.chain().focus().toggleHighlight({ color: '#9C27B0' }).run(),
                isActive: () => editor.isActive({ color: '#9C27B0' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Глубокий сиреневый',
                classes: 'deep-purple',
                action: () => editor.chain().focus().toggleHighlight({ color: '#673AB7' }).run(),
                isActive: () => editor.isActive({ color: '#673AB7' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Индиго',
                classes: 'indigo',
                action: () => editor.chain().focus().toggleHighlight({ color: '#3F51B5' }).run(),
                isActive: () => editor.isActive({ color: '#3F51B5' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Синий',
                classes: 'blue',
                action: () => editor.chain().focus().toggleHighlight({ color: '#2196F3' }).run(),
                isActive: () => editor.isActive({ color: '#2196F3' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Светло синий',
                classes: 'light-blue',
                action: () => editor.chain().focus().toggleHighlight({ color: '#03A9F4' }).run(),
                isActive: () => editor.isActive({ color: '#03A9F4' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Океан',
                classes: 'cyan',
                action: () => editor.chain().focus().toggleHighlight({ color: '#00BCD4' }).run(),
                isActive: () => editor.isActive({ color: '#00BCD4' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Чирок',
                classes: 'teal',
                action: () => editor.chain().focus().toggleHighlight({ color: '#009688' }).run(),
                isActive: () => editor.isActive({ color: '#009688' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Зеленый',
                classes: 'green',
                action: () => editor.chain().focus().toggleHighlight({ color: '#4CAF50' }).run(),
                isActive: () => editor.isActive({ color: '#4CAF50' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Светлый зеленый',
                classes: 'light-green',
                action: () => editor.chain().focus().toggleHighlight({ color: '#8BC34A' }).run(),
                isActive: () => editor.isActive({ color: '#8BC34A' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Лайм',
                classes: 'lime',
                action: () => editor.chain().focus().toggleHighlight({ color: '#CDDC39' }).run(),
                isActive: () => editor.isActive({ color: '#CDDC39' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Желтый',
                classes: 'yellow',
                action: () => editor.chain().focus().toggleHighlight({ color: '#FFEB3B' }).run(),
                isActive: () => editor.isActive({ color: '#FFEB3B' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Янтарный',
                classes: 'amber',
                action: () => editor.chain().focus().toggleHighlight({ color: '#FFC107' }).run(),
                isActive: () => editor.isActive({ color: '#FFC107' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Оранжевый',
                classes: 'orange',
                action: () => editor.chain().focus().toggleHighlight({ color: '#FF9800' }).run(),
                isActive: () => editor.isActive({ color: '#FF9800' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Глубокий оранжевый',
                classes: 'deep-orange',
                action: () => editor.chain().focus().toggleHighlight({ color: '#ff5722' }).run(),
                isActive: () => editor.isActive({ color: '#ff5722' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Коричневый',
                classes: 'brown',
                action: () => editor.chain().focus().toggleHighlight({ color: '#795548' }).run(),
                isActive: () => editor.isActive({ color: '#795548' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Сине-серый',
                classes: 'blue-grey',
                action: () => editor.chain().focus().toggleHighlight({ color: '#607d8b' }).run(),
                isActive: () => editor.isActive({ color: '#607d8b' }),
            },
            {
                icon: 'mdi-format-color-text',
                title: 'Серый',
                classes: 'grey',
                action: () => editor.chain().focus().toggleHighlight({ color: '#9E9E9E' }).run(),
                isActive: () => editor.isActive({ color: '#9E9E9E' }),
            },
        ],
    },
]
