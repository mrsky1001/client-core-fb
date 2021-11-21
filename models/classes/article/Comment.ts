/*
 * Copyright (c) 21.11.2021, 23:33  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import statuses from '@/core/lib/statuses'
import { IComment } from '@/core/models/interfaces/article/IComment'
import { IUser } from '@/core/models/interfaces/auth/IUser'
import { IStatus } from '@/core/models/interfaces/article/IStatus'
import GenericModel from '@/core/models/classes/app/GenericModel'

export default class Comment extends GenericModel implements IComment {
    private _date = ''
    private _content = ''
    private _errorMsg = ''
    private _author: IUser | null = null
    private _status: IStatus = statuses.DRAFT

    constructor(initObj: IComment) {
        super(initObj)
        this.init(initObj)
    }

    init(initObj: IComment): void {
        this.author = initObj.author ? initObj.author : this._author
        this.content = initObj.content ? initObj.content : this._content
        this.date = initObj.date ? initObj.date : this._date
        this.status = initObj.status ? initObj.status : this._status
        this.errorMsg = initObj.content ? initObj.content : this._errorMsg
    }

    get author(): IUser | null {
        return this._author
    }

    set author(value: IUser | null) {
        this._author = value
    }

    get content(): string {
        return this._content
    }

    set content(value: string) {
        this._content = value
    }

    get date(): string {
        return this._date
    }

    set date(value: string) {
        this._date = value
    }

    get status(): IStatus {
        return this._status
    }

    set status(value: IStatus) {
        this._status = value
    }

    get errorMsg(): string {
        return this._errorMsg
    }

    set errorMsg(value: string) {
        this._errorMsg = value
    }
}
