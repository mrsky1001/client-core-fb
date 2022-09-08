/*
 * Copyright (c) 27.11.2021, 20:07  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */
/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex from 'vuex'
import Vue from 'vue'
import {
    addLikePhotoPost,
    addLikePost,
    changeSizePhotoPost,
    changeStatusPost,
    deletePost,
    editPost,
    getPost,
    removeLikePhotoPost,
    removeLikePost,
} from '@/core/services/post.services'
import { addComment, deleteComment, getComments } from '@/core/services/comment.services'
import { IPost } from '@/core/models/interfaces/article/IPost'
import routesObj from '@/app/routes/routes-obj'
import { action, createModule, mutation } from 'vuex-class-component'
import Post from '@/core/models/classes/article/Post'
import Comment from '@/core/models/classes/article/Comment'
import statuses from '@/core/collections/statuses'
import { vxc } from '@/core/store/store.vuex'
import recaptchaLib from '@/core/lib/recaptcha.lib'
import { vxa } from '@/app/store/store.app'
import IPhotoPost from '@/core/models/interfaces/article/IPhotoPost'

Vue.use(Vuex)

const VuexModule = createModule({
    namespaced: 'post',
    strict: false,
})

export class PostStore extends VuexModule {
    post: Post | null = null
    loading = false
    isShowDeleteModal = false
    comments: Comment[] = []
    validCommentRules = {
        min: 3,
        max: 1000,
        'regex-valid-text': 1,
    }
    commentContent: string = ''
    isDisabledSendComment = false
    sendTime = 0

    get hasLikeUser() {
        return this.post && this.post.likes.includes(vxc.auth.user.id)
    }

    get dateToStringFormat() {
        return (date: Date | undefined) => {
            return date ? new Date(date).toLocaleDateString() : ''
        }
    }

    get getPostRoute() {
        return (post: IPost) => {
            return { name: routesObj.POST.name, params: { title: post.urlTitle, postId: post.id } }
        }
    }

    get getEditPostRoute() {
        return (post: IPost) => {
            return { name: routesObj.EDIT_POST.name, params: { title: post.urlTitle, postId: post.id } }
        }
    }

    get statusObj() {
        return (status: number) => {
            return Object.values(statuses).find((s) => s.value === status)
        }
    }

    @mutation
    setShowDeleteModal(val: boolean) {
        this.isShowDeleteModal = val
    }

    @mutation
    setPost(post: Post) {
        this.post = post
    }

    @mutation
    setComment(content: string) {
        this.commentContent = content
    }

    @mutation
    setSendTime(val: number) {
        this.sendTime = val
    }

    @mutation
    setIsDisabledSendComment(val: boolean) {
        this.isDisabledSendComment = val
    }

    @action
    async runTimerSend(seconds: number) {
        this.sendTime = 0

        const interval = setInterval(() => {
            this.setSendTime(this.sendTime + 1)
        }, 1000)

        const timer = setTimeout(() => {
            this.setIsDisabledSendComment(false)
            clearInterval(interval)
            clearTimeout(timer)
        }, seconds * 1000)
    }

    @action
    async onChangeSizePhotoImg(props: { img: IPhotoPost; size: number }) {
        props.img.size = props.size

        if (this.post) {
            return changeSizePhotoPost(this.post.id, props.img.title, props.size)
        }
    }

    @action
    async setPhotoLike(img: IPhotoPost) {
        if (this.post) {
            this.loading = true

            if (img.likes.includes(vxc.auth.user.id)) {
                return removeLikePhotoPost(this.post.id)
                    .then((post) => {
                        this.post = post
                    })
                    .finally(() => {
                        this.loading = false
                    })
            } else {
                return addLikePhotoPost(this.post.id)
                    .then((post) => {
                        this.post = post
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }

    @action
    async getPost(props: { postId: string; title: string }) {
        // if (!this.loading) {
        this.loading = true

        return getPost(props.postId, props.title)
            .then((post) => {
                this.post = post
                void this.getComments()
            })
            .finally(() => {
                this.loading = false
            })
        // }
    }

    @action
    async getComments() {
        if (this.post) {
            this.loading = true
            return getComments(this.post.id)
                .then((comments) => {
                    this.comments = comments
                    this.commentContent = ''
                })
                .finally(() => {
                    this.loading = false
                })
        }
    }

    @action
    async addComment() {
        if (this.post && vxc.auth.isCaptchaVerify) {
            this.loading = true

            const comment = {
                postId: this.post.id,
                content: this.commentContent,
                responseKey: vxc.auth.responseKey,
            }

            return addComment(comment)
                .then(() => {
                    void this.getComments()
                    this.setIsDisabledSendComment(true)
                    this.runTimerSend(60)
                })
                .finally(() => {
                    this.loading = false
                })
        } else {
            recaptchaLib.errorEvent()
        }
    }

    @action
    async setLike() {
        if (this.post) {
            this.loading = true

            if (this.hasLikeUser) {
                return removeLikePost(this.post.id)
                    .then((post) => {
                        this.post = post
                    })
                    .finally(() => {
                        this.loading = false
                    })
            } else {
                return addLikePost(this.post.id)
                    .then((post) => {
                        this.post = post
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }

    @action
    async deleteComment(commentId: string) {
        this.loading = true

        return deleteComment(commentId)
            .then(() => {
                void this.getComments()
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action
    async deletePost(postId: string) {
        void deletePost(postId).then(() => {
            this.isShowDeleteModal = false
            vxa.home.removePost(postId)
        })
    }

    @action
    async onChangeStatus(props: { postId: string; status: number }) {
        return changeStatusPost(props.postId, props.status).then((post) => {
            vxa.home.updatePost(post)
        })
    }
}

export default PostStore
