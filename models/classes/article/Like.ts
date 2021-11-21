/*
 * Copyright (c) 21.11.2021, 23:32  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import serviceStorage from '../../../../app/common/service-storage'
import { ILike } from '@/core/models/interfaces/article/ILike'
import GenericModel from '@/core/models/classes/app/GenericModel'

export default class Like extends GenericModel {
    private _postId = ''

    constructor(initObj: ILike) {
        super(initObj)
        this.init(initObj)
    }

    init(initObj: ILike): void {
        this.postId = initObj.postId ? initObj.postId : this._postId
    }

    static getLikesStorage(): ILike[] {
        const likesTemp = serviceStorage.getProp('likes')
        return likesTemp ? likesTemp : []
    }

    static getLikePost(postId: string): ILike | undefined {
        const likes = Like.getLikesStorage()
        return likes.find((like) => like.postId === postId)
    }

    static addLikeStorage(propLike: ILike): ILike {
        const like = Like.getLikePost(propLike.postId)

        if (!like) {
            const likes = Like.getLikesStorage()
            const newLike = new Like(propLike)

            likes.push(newLike)
            serviceStorage.setProp('likes', likes)

            return newLike
        }

        return like
    }

    static removeLikeStorage(postId: string): void {
        const like = Like.getLikePost(postId)
        if (like) {
            const likes = Like.getLikesStorage().filter((like) => !like.postId)
            serviceStorage.setProp('likes', likes)
        }
    }

    get postId(): string {
        return this._postId
    }

    set postId(value: string) {
        this._postId = value
    }
}
