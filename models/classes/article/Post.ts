/*
 * Copyright (c) 21.11.2021, 23:33  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import GenericModel from '@/core/models/classes/app/GenericModel'
import { IAnnotation } from '@/core/models/interfaces/article/IAnnotation'
import { IShare } from '@/core/models/interfaces/article/IShare'
import { IComment } from '@/core/models/interfaces/article/IComment'
import { ITag } from '@/core/models/interfaces/article/ITag'
import { IPost } from '@/core/models/interfaces/article/IPost'
import { ILike } from '@/core/models/interfaces/article/ILike'
import { IUser } from '@/core/models/interfaces/auth/IUser'
import statuses from '@/core/collections/statuses'
import User from '@/core/models/classes/auth/User'
import Annotation from '@/core/models/classes/article/Annotation'

export default class Post extends GenericModel implements IPost {
    private _title = ''
    private _urlTitle = ''
    private _content = ''
    private _creatingDate = new Date()
    private _updatingDate = new Date()
    private _publishedDate = new Date()
    private _views = 0
    private _readTime = 0
    private _tags: ITag[] = []
    private _likes: ILike[] = []
    private _shares: IShare[] = []
    private _comments: IComment[] = []
    private _author: IUser = new User()
    private _status: number = statuses.DRAFT.value
    private _annotation: IAnnotation = new Annotation()

    constructor(initObj?: IPost) {
        super(initObj)
        initObj && this.init(initObj)
    }

    init(initObj: IPost): void {
        this.title = initObj.title ? initObj.title : this._title
        this.urlTitle = initObj.urlTitle ? initObj.urlTitle : this._urlTitle
        this.content = initObj.content ? initObj.content : this._content
        this.annotation = initObj.annotation ? initObj.annotation : this._annotation
        this.tags = initObj.tags ? initObj.tags : this._tags

        this.author = initObj.author ? initObj.author : this._author
        this.creatingDate = initObj.creatingDate ? initObj.creatingDate : this._creatingDate
        this.updatingDate = initObj.updatingDate ? initObj.updatingDate : this._updatingDate
        this.publishedDate = initObj.publishedDate ? initObj.publishedDate : this._publishedDate
        this.views = initObj.views ? initObj.views : this._views
        this.likes = initObj.likes ? initObj.likes : this._likes
        this.shares = initObj.shares ? initObj.shares : this._shares
        this.status = initObj.status ? initObj.status : this._status
        this.readTime = initObj.readTime ? initObj.readTime : this._readTime
        this.comments = initObj.comments ? initObj.comments : this._comments

        this.jsonFormatObjects = [{ name: 'status', valuePath: 'value' }]
    }

    updateContent(obj: Post): void {
        this.title = obj.title ? obj.title : this._title
        this.urlTitle = obj.urlTitle ? obj.urlTitle : this._urlTitle
        this.annotation = obj.annotation ? obj.annotation : this._annotation
        this.content = obj.content ? obj.content : this._content
        this.tags = obj.tags ? obj.tags : this._tags
    }

    get comments(): IComment[] {
        return this._comments
    }

    set comments(value: IComment[]) {
        this._comments = value
    }

    get annotation(): IAnnotation {
        return this._annotation
    }

    set annotation(value: IAnnotation) {
        this._annotation = value
    }

    get readTime(): number {
        return this._readTime
    }

    set readTime(value: number) {
        this._readTime = value
    }

    get status(): number {
        return this._status
    }

    set status(value: number) {
        this._status = value
    }

    get title(): string {
        return this._title
    }

    set title(value: string) {
        this._title = value
    }

    get urlTitle(): string {
        return this._urlTitle
    }

    set urlTitle(value: string) {
        this._urlTitle = value
    }

    get content(): string {
        return this._content
    }

    set content(value: string) {
        this._content = value
    }

    get creatingDate(): Date {
        return this._creatingDate
    }

    set creatingDate(value: Date) {
        this._creatingDate = value
    }

    get updatingDate(): Date {
        return this._updatingDate
    }

    set updatingDate(value: Date) {
        this._updatingDate = value
    }

    get publishedDate(): Date {
        return this._publishedDate
    }

    set publishedDate(value: Date) {
        this._publishedDate = value
    }

    get author(): IUser {
        return this._author
    }

    set author(value: IUser) {
        this._author = value
    }

    get views(): number {
        return this._views
    }

    set views(value: number) {
        this._views = value
    }

    get likes(): ILike[] {
        return this._likes
    }

    set likes(value: ILike[]) {
        this._likes = value
    }

    get shares(): IShare[] {
        return this._shares
    }

    set shares(value: IShare[]) {
        this._shares = value
    }

    get tags(): ITag[] {
        return this._tags
    }

    set tags(value: ITag[]) {
        this._tags = value
    }
}
