/*
 * Copyright (c) 27.11.2021, 20:07  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */
/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import { getFiltersPosts, getPosts } from '@/core/services/post.services'
import { getSections } from '@/core/services/sections.services'
import { IPost } from '@/core/models/interfaces/article/IPost'
import { action, createModule, mutation } from 'vuex-class-component'
import { ISection } from '@/core/models/interfaces/article/ISection'
import Section from '@/core/models/classes/article/Section'
import defaultSection from '@/app/views/Home/extensions/default-section'
import { IPostsFilter } from '@/core/models/interfaces/filter/filters-posts'
import Post from '@/core/models/classes/article/Post'

const VuexModule = createModule({
    namespaced: 'home',
    strict: false,
})

export class HomeStore extends VuexModule {
    loading = false
    isAllPostsUpload = false
    searchText = ''
    selectedFilters: IPostsFilter[] = []
    posts: IPost[] = []
    sections: ISection[] = []
    currentSection: ISection = new Section()
    isNoFound = false
    filtersPosts: IPostsFilter[] = []
    typeHomeView = 0

    @mutation setTypeHomeView(val: number) {
        this.typeHomeView = val === this.typeHomeView ? 0 : val
    }

    @mutation addPosts(val: []) {
        this.posts = [...this.posts, ...val]
    }

    @mutation updatePost(post: Post) {
        this.posts[this.posts.findIndex((p) => p.id === post.id)] = post
        this.posts = [...this.posts]
    }

    @mutation removePost(postId: string) {
        this.posts = this.posts.filter((p) => p.id !== postId)
    }

    @mutation setSections(val: ISection[]) {
        this.sections = val
    }

    @mutation setSearchText(val: string) {
        this.searchText = val
    }

    @mutation setCurrentSection(val: ISection | string) {
        if (typeof val === 'string') {
            const sectionTemp = this.sections.find((s) => s.id === val)
            this.currentSection = sectionTemp ? sectionTemp : this.currentSection
        } else {
            this.currentSection = val
        }
    }

    @action
    async reset(withGetPosts = true) {
        this.isAllPostsUpload = false
        this.loading = false
        this.posts = []
        this.searchText = ''

        this.setCurrentSection(defaultSection)
        withGetPosts && (await this.getPosts(true))
    }

    @action
    async getSections() {
        this.loading = true

        return getSections()
            .then((sections) => {
                this.setSections(sections)
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action
    async getPosts(isReset = false) {
        if (!this.isAllPostsUpload || isReset) {
            const lastPost: IPost = this.posts[this.posts.length - 1]
            const last: Date = this.posts.length && !isReset ? lastPost.creatingDate : new Date()
            const sectionId: string = this.currentSection.id ? this.currentSection.id : ''

            this.loading = true

            getPosts(sectionId, last, this.searchText)
                .then((posts) => {
                    if (!isReset && posts.length === 0) {
                        this.isAllPostsUpload = true
                    } else {
                        this.isNoFound = posts.length === 0 && this.searchText.length > 0
                        if (isReset) {
                            this.posts = [...posts]
                        } else {
                            const newPosts: IPost[] = []

                            posts.forEach((p) => {
                                if (!this.posts.find((p2) => p.title === p2.title)) {
                                    newPosts.push(p)
                                }
                            })

                            this.posts = [...this.posts, ...newPosts]
                        }
                    }
                })
                .finally(() => {
                    this.loading = false
                })
        }
    }

    @action
    async getFiltersPosts() {
        this.loading = true

        getFiltersPosts()
            .then((filtersPosts) => {
                this.filtersPosts = filtersPosts
            })
            .finally(() => {
                this.loading = false
            })
    }
}

export default HomeStore
