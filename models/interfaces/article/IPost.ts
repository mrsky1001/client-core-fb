/*
 * Copyright (c) 21.11.2021, 23:30  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import { IGenericModel } from '@/core/models/interfaces/app/IGenericModel'
import { ITag } from '@/core/models/interfaces/article/ITag'
import { ILike } from '@/core/models/interfaces/article/ILike'
import { IShare } from '@/core/models/interfaces/article/IShare'
import { IStatus } from '@/core/models/interfaces/article/IStatus'
import { IUser } from '@/core/models/interfaces/auth/IUser'
import { IComment } from '@/core/models/interfaces/article/IComment'
import { IAnnotation } from '@/core/models/interfaces/article/IAnnotation'

export interface IPost extends IGenericModel {
    title: string
    urlTitle: string
    content: string
    creatingDate: string
    updatingDate: string
    publishedDate: string
    views: number
    readTime: number
    tags: ITag[]
    likes: ILike[]
    status: IStatus
    shares: IShare[]
    author: IUser | null
    comments: IComment[]
    annotation: IAnnotation | null
}
