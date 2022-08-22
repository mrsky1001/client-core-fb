/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

export default (onSave: () => void, onShowPreview: () => void, onPublishAndSave: () => void) => [
    {
        buttons: [
            {
                icon: 'mdi-file-find-outline',
                title: 'Предпросмотр',
                action: onShowPreview,
            },
        ],
    },
    {
        buttons: [
            {
                icon: 'mdi-content-save-move-outline',
                title: 'Сохранить и опубликовать',
                action: onPublishAndSave,
            },
            {
                icon: 'mdi-content-save-outline',
                isSuccessNewPost: true,
                title: 'Сохранить',
                action: onSave,
            },
        ],
    },
]
