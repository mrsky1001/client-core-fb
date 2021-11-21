/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

import api from '@/core/services/api'
import urls from '@/app/common/urls'
import { AxiosError, AxiosResponse } from 'axios'
import exceptions from '@/app/common/exceptions'
import { IRule } from '@/core/models/interfaces/lib/IRule'
import { IPost } from '@/core/models/interfaces/article/IPost'
import { handlerError, responseHandler } from '@/app/common/response-handler'
import Post from '@/core/models/classes/article/Post'
import { snackbarStore } from '@/app/store/index.store'

const getInValidPostFields = (post: IPost) => {
    const rules: IRule[] = [
        { name: 'title', label: 'Заголовок', type: 'string', min: 3 },
        { name: 'content', label: 'Содержание', type: 'string', min: 10 },
        {
            name: 'annotation',
            type: 'object',
            listCheckFields: [{ name: 'text', label: 'Текст аннотации', type: 'string', min: 3 }],
        },
        { name: 'tags', label: 'Разделы', type: 'array', min: 1 },
    ]

    const check = (array: IRule[], name?: string): void => {
        array.forEach((rule: IRule) => {
            // @ts-ignore
            const val = name ? post[name][rule.name] : post[rule.name]

            if (rule.type === 'string') {
                rule.label && rule.min && String(val).length < rule.min && listError.push(rule.label)
            } else if (rule.type === 'object' && rule.listCheckFields) {
                check(rule.listCheckFields, rule.name)
            } else if (rule.type === 'array') {
                rule.label && rule.min && val.length < rule.min && listError.push(rule.label)
            }
        })
    }

    const listError: string[] = []

    check(rules)

    return listError
}

export const getPost = (postId: string, title: string): Promise<IPost> => {
    return new Promise<IPost>((resolve, reject) => {
        const url = `${urls.GET_POST_BY_ID}/${postId}/${title}`
        api()
            .get(url)
            .then((res: AxiosResponse) => {
                responseHandler(res)
                    .then((data) => resolve(new Post(data)))
                    .catch((err: AxiosError) => {
                        handlerError(err)
                        reject(err)
                    })
            })
            .catch((err: AxiosError) => {
                handlerError(err)
                reject(err)
            })
    })
}
export const getPosts = (section: string, searchText: string): Promise<IPost[]> => {
    return new Promise<IPost[]>((resolve, reject) => {
        api()
            .get(`${urls.GET_ALL_POSTS}/${section}/${searchText}`)
            .then((res: AxiosResponse) => {
                responseHandler(res)
                    .then((data) => resolve(data.map((post: IPost) => new Post(post))))
                    .catch((err: AxiosError) => {
                        handlerError(err)
                        reject(err)
                    })
            })
            .catch((err: AxiosError) => {
                handlerError(err)
                reject(err)
            })
    })
}
export const addPost = (post: IPost): Promise<IPost> => {
    return new Promise<IPost>((resolve, reject) => {
        const listErrors = getInValidPostFields(post)

        if (!listErrors.length) {
            api()
                .post(urls.CREATE_POST, post)
                .then((res: AxiosResponse) => {
                    responseHandler(res)
                        .then((data) => resolve(new Post(data)))
                        .catch((err: AxiosError) => {
                            handlerError(err)
                            reject(err)
                        })
                })
                .catch((err: AxiosError) => {
                    handlerError(err)
                    reject(err)
                })
        } else {
            const msg = { msg: exceptions.NOT_VALID, params: listErrors }
            snackbarStore.commit('setSnackBarMsg', msg)
        }
    })
}
export const editPost = (post: IPost): Promise<IPost> => {
    return new Promise<IPost>((resolve, reject) => {
        const listErrors = getInValidPostFields(post)

        if (!listErrors.length) {
            const url = `${urls.UPDATE_POST_BY_ID}/${post.id}`

            api()
                .put(url, post)
                .then((res: AxiosResponse) => {
                    responseHandler(res)
                        .then((data) => resolve(new Post(data)))
                        .catch((err: AxiosError) => {
                            handlerError(err)
                            reject(err)
                        })
                })
                .catch((err: AxiosError) => {
                    handlerError(err)
                    reject(err)
                })
        } else {
            const msg = { msg: exceptions.NOT_VALID, params: listErrors }
            snackbarStore.commit('setSnackBarMsg', msg)
        }
    })
}
export const deletePost = (postId: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const url = `${urls.UPDATE_POST_BY_ID}/${postId}`

        api()
            .delete(url)
            .then((res: AxiosResponse) => {
                responseHandler(res)
                    .then(() => resolve())
                    .catch((err: AxiosError) => {
                        handlerError(err)
                        reject(err)
                    })
            })
            .catch((err: AxiosError) => {
                handlerError(err)
                reject(err)
            })
    })
}
