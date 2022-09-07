/*
 * Copyright (c) 21.11.2021, 23:33  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import GenericModel from '@/core/models/classes/app/GenericModel'
import IPhotoPost from '@/core/models/interfaces/article/IPhotoPost'

export default class PhotoPost extends GenericModel implements IPhotoPost {
    private _postId: string = ''
    private _title: string = ''
    private _url: string = ''
    private _size: number = 2
    private _description: string = ''

    private _likes: string[] = []

    constructor(initObj?: IPhotoPost) {
        super(initObj)

        if (initObj) {
            this.init(initObj)
        } else {
            this.emptyInit()
        }
    }

    emptyInit() {
        this.title = ''
        this.size = 2
        this.description = ''
    }

    init(initObj: IPhotoPost): void {
        this.title = initObj.title ? initObj.title : this._title
        this.url = initObj.url ? initObj.url : this._url
        this.postId = initObj.postId ? initObj.postId : this._postId
        this.size = initObj.size ? initObj.size : this._size
        this.description = initObj.description ? initObj.description : this._description
        this.likes = initObj.likes ? initObj.likes : this._likes
    }

    get postId(): string {
        return this._postId
    }

    set postId(value: string) {
        this._postId = value
    }

    get title(): string {
        return this._title
    }

    set title(value: string) {
        this._title = value
    }

    get likes(): string[] {
        return this._likes
    }

    set likes(value: string[]) {
        this._likes = value
    }

    get url(): string {
        return this._url
    }

    set url(value: string) {
        this._url = value
    }

    get size(): number {
        return this._size
    }

    set size(value: number) {
        this._size = value
    }

    get description(): string {
        return this._description
    }

    set description(value: string) {
        this._description = value
    }
}
