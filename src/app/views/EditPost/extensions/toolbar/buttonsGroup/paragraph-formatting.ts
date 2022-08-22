/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

import { Editor } from '@tiptap/vue-2'

export default (editor: Editor) => [
    {
        isDropDown: true,
        title: 'Выбрать выравнивание',
        icon: 'mdi-format-align-justify',
        buttons: [
            {
                icon: 'mdi-format-align-left',
                title: 'По левому краю',
                action: () => editor.chain().focus().setTextAlign('left').run(),
                isActive: () => editor.isActive({ 'text-align': 'left' }),
            },
            {
                icon: 'mdi-format-align-center',
                title: 'По центру',
                action: () => editor.chain().focus().setTextAlign('center').run(),
                isActive: () => editor.isActive({ 'text-align': 'center' }),
            },
            {
                icon: 'mdi-format-align-right',
                title: 'По правому краю',
                action: () => editor.chain().focus().setTextAlign('right').run(),
                isActive: () => editor.isActive({ 'text-align': 'right' }),
            },
            {
                icon: 'mdi-format-align-justify',
                title: 'По ширине',
                action: () => editor.chain().focus().setTextAlign('justify').run(),
                isActive: () => editor.isActive({ 'text-align': 'justify' }),
            },
        ],
    },
    {
        isDropDown: true,
        title: 'Выбрать заголовок',
        icon: 'mdi-format-header-pound',
        buttons: [
            {
                icon: 'mdi-format-header-1',
                title: 'Заголовок 1',
                action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                isActive: () => editor.isActive('heading', { level: 1 }),
            },
            {
                icon: 'mdi-format-header-2',
                title: 'Заголовок 2',
                action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                isActive: () => editor.isActive('heading', { level: 2 }),
            },
            {
                icon: 'mdi-format-header-3',
                title: 'Заголовок 3',
                action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                isActive: () => editor.isActive('heading', { level: 3 }),
            },
            {
                icon: 'mdi-format-header-4',
                title: 'Заголовок 4',
                action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
                isActive: () => editor.isActive('heading', { level: 4 }),
            },
            {
                icon: 'mdi-format-header-5',
                title: 'Заголовок 5',
                action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
                isActive: () => editor.isActive('heading', { level: 5 }),
            },
            {
                icon: 'mdi-format-header-6',
                title: 'Заголовок 6',
                action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
                isActive: () => editor.isActive('heading', { level: 6 }),
            },
            {
                icon: 'mdi-format-paragraph',
                title: 'Обычный(Control Alt 0, Cmd Alt 0)',
                action: () => editor.chain().focus().setParagraph().run(),
                isActive: () => editor.isActive('paragraph'),
            },
        ],
    },
    {
        buttons: [
            {
                icon: 'mdi-format-list-bulleted',
                title: 'Маркированный список',
                action: () => editor.chain().focus().toggleBulletList().run(),
                isActive: () => editor.isActive('bulletList'),
            },
            {
                icon: 'mdi-format-list-numbered',
                title: 'Нумерованный список',
                action: () => editor.chain().focus().toggleOrderedList().run(),
                isActive: () => editor.isActive('orderedList'),
            },
            // {
            //   icon: 'mdi-format-list-checks',
            //   title: 'Список задач',
            //   action: () => editor.chain().focus().toggleTaskList().run(),
            //   isActive: () => editor.isActive('taskList'),
            // },
            {
                icon: 'mdi-code-json',
                title: 'Весь блок в виде кода',
                action: () => {
                    editor.chain().focus().toggleCodeBlock().run()
                },
                isActive: () => editor.isActive('codeBlock'),
            },
            {
                icon: 'mdi-comment-quote-outline',
                title: 'Комментарий',
                action: () => editor.chain().focus().toggleBlockquote().run(),
                isActive: () => editor.isActive('blockquote'),
            },
        ],
    },
]
