/*
 * Copyright (c) 20.12.2021, 20:06  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import { IPost } from '@/core/models/interfaces/article/IPost'

interface ITablePost {
    self: IPost
    views: number
    title: string | undefined
    status: number
    username: string
    publishedDate: string | undefined
}

interface ITablePostRow {
    text: string
    align: string
    value: string
    class?: string
}

interface IViewPostsTable {
    headers: ITablePostRow[]
    headersEditor: ITablePostRow[]
    posts: ITablePost[]
}

export const tablePosts: IViewPostsTable = {
    headers: [
        {
            text: 'Статья',
            align: 'start',
            value: 'title',
            class: 'posts-table__header-th',
        },
        {
            text: 'Автор',
            align: 'start',
            value: 'username',
            class: 'posts-table__header-th',
        },
        {
            text: 'Публикация',
            align: 'start',
            value: 'publishedDate',
            class: 'posts-table__header-th',
        },
        {
            text: 'Нравится',
            align: 'end',
            value: 'likes',
            class: 'posts-table__header-th',
        },
        {
            text: 'Просм-ов',
            align: 'end',
            value: 'views',
            class: 'posts-table__header-th',
        },
        {
            text: 'Комм-ев',
            align: 'end',
            value: 'countComments',
            class: 'posts-table__header-th',
        },
    ],
    headersEditor: [
        {
            text: 'Статья',
            align: 'start',
            value: 'title',
            class: 'posts-table__header-th',
        },
        {
            text: 'Автор',
            align: 'start',
            value: 'username',
            class: 'posts-table__header-th',
        },
        {
            text: 'Публикация',
            align: 'start',
            value: 'publishedDate',
            class: 'posts-table__header-th',
        },
        {
            text: 'Заполненность',
            align: 'start',
            value: 'countSymbols',
            class: 'posts-table__header-th',
        },
        {
            text: 'Статус',
            align: 'end',
            value: 'status',
            class: 'posts-table__header-th',
        },
        {
            text: 'Действия',
            align: 'center',
            value: 'actions',
            class: 'posts-table__header-th',
        },
        {
            text: 'Нравится',
            align: 'end',
            value: 'likes',
            class: 'posts-table__header-th',
        },
        {
            text: 'Просмотров',
            align: 'end',
            value: 'views',
            class: 'posts-table__header-th',
        },
        {
            text: 'Комментариев',
            align: 'end',
            value: 'countComments',
            class: 'posts-table__header-th',
        },
    ],
    posts: [],
}
