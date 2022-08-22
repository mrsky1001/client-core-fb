<!--
  - Copyright (c) 20.12.2021, 20:06  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <v-row class="table-view-posts" @mouseleave="modal.isShow = false">
        <!--        <div v-show="modal.isShow" class="annotation-modal" :style="{ top: modal.top, left: modal.left }">-->
        <!--            <post-annotation :post="modal.post"></post-annotation>-->
        <!--        </div>-->
        <delete-post />
        <v-data-table
            v-if="authST.isEditor"
            class="posts-table"
            hide-default-footer
            :items-per-page="-1"
            :mobile-breakpoint="1000"
            :headers="table.headersEditor"
            :items="table.posts"
        >
            <template #[`item.title`]="item">
                <router-link :to="postST.getPostRoute(item.item)">
                    <h1>
                        {{ item.item.title }}
                    </h1>
                </router-link>
            </template>
            <template #[`item.username`]="item">
                <div>@{{ item.item.username }}</div>
            </template>
            <template #[`item.publishedDate`]="item">
                <div>
                    {{ item.item.publishedDate }}
                </div>
            </template>
            <template #[`item.actions`]="item">
                <div v-if="authST.isEditor" style="min-width: 110px">
                    <v-btn small class="mr-2" icon title="Редактировать" :to="postUrl(item)">
                        <v-icon> mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                        v-if="item.item.self.status === statuses.PUBLISHED.value"
                        small
                        class="mr-2"
                        icon
                        title="Снять с публикации"
                        @click="
                            () => postST.onChangeStatus({ postId: item.item.self.id, status: statuses.DRAFT.value })
                        "
                    >
                        <v-icon> {{ statuses.DRAFT.icon }}</v-icon>
                    </v-btn>
                    <v-btn
                        v-if="item.item.self.status !== statuses.PUBLISHED.value"
                        small
                        class="mr-2"
                        icon
                        title="Опубликовать"
                        @click="
                            () => postST.onChangeStatus({ postId: item.item.self.id, status: statuses.PUBLISHED.value })
                        "
                    >
                        <v-icon> {{ statuses.PUBLISHED.icon }}</v-icon>
                    </v-btn>
                    <v-btn small class="mr-2" icon title="Удалить" @click="setShowDeleteModal(item.item.self)">
                        <v-icon> mdi-trash-can-outline</v-icon>
                    </v-btn>
                </div>
            </template>
            <template #[`item.status`]="item">
                <v-icon :color="postST.statusObj(item.item.self.status).color + ' lighten-1'">
                    {{ postST.statusObj(item.item.self.status).icon }}
                </v-icon>
            </template>
        </v-data-table>
        <v-data-table
            v-if="!authST.isEditor"
            class="posts-table"
            hide-default-footer
            :headers="table.headers"
            :mobile-breakpoint="100"
            :items-per-page="-1"
            :items="table.posts"
        >
            <template #[`item.title`]="item">
                <router-link :to="postST.getPostRoute(item.item)">
                    <h1>
                        {{ item.item.title }}
                    </h1>
                </router-link>
            </template>
            <template #[`item.username`]="item">
                <div>@{{ item.item.username }}</div>
            </template>
            <template #[`item.publishedDate`]="item">
                <div>
                    {{ item.item.publishedDate }}
                </div>
            </template>
        </v-data-table>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import routesObj from '../../../../routes/routes-obj'
import statuses from '../../../../../core/collections/statuses'
import Post from '../../../../../core/models/classes/article/Post'
import { vxc } from '@/core/store/store.vuex'
import { Watch } from 'vue-property-decorator'
import { tablePosts } from '@/app/views/Home/extensions/tablePosts/table-posts'
import { vxa } from '@/app/store/store.app'
import DeletePost from '@/app/views/Post/extensions/DeletePost/DeletePost.vue'
import PostAnnotation from '@/app/views/Post/extensions/PostAnnotation/PostAnnotation.vue'

@Component({
    components: { DeletePost, PostAnnotation },
})
export default class TableViewPosts extends Vue {
    postST = vxa.post
    homeST = vxa.home
    authST = vxc.auth
    routesObj = routesObj
    statuses = statuses
    table = tablePosts

    mounted() {
        this.init()
    }

    modal = {
        isShow: false,
        post: new Post(),
        left: '20vw',
        top: '20vh',
    }

    showDeleteModal = false
    postForDelete = null

    @Watch('homeST.posts')
    changedPosts() {
        this.init()
    }

    init() {
        this.table.posts = this.homeST.posts.map((post) => {
            return {
                self: post,
                id: post.id,
                views: post.views,
                likes: post.likes.length,
                countComments: post.countComments,
                title: post.title,
                status: post.status,
                username: post.author.username,
                urlTitle: post.urlTitle,
                countSymbols: post.countSymbols,
                publishedDate:
                    post.publishedDate !== undefined ? new Date(post.publishedDate).toLocaleDateString() : '',
            }
        })
    }

    postUrl(item: any) {
        return {
            name: routesObj.EDIT_POST.name,
            params: { title: item.item.self.urlTitle, postId: item.item.self.id },
        }
    }

    onHoverPostRow(e: Event, post: Post) {
        this.postST.setPost(post)

        // this.modal.left = e.clientX / 40 + 'vw'
        // this.modal.top = window.scrollY / 10 + e.clientY / 18 + 'vh'
    }

    setShowDeleteModal(post: Post) {
        this.postST.setPost(post)
        this.postST.setShowDeleteModal(true)
    }
}
</script>

<style lang="scss">
.table-view-posts {
    z-index: 4;

    .annotation-modal {
        position: absolute;
        z-index: 5;
        max-width: 400px !important;
    }

    .posts-table {
        //width: 100%;
        font-size: small;
        margin-bottom: 20px;

        .posts-table__header-th {
            white-space: nowrap;
        }

        * {
            color: gray;
            font-size: small;
            //font-size: large !important;
        }

        .v-btn--fab.v-size--default .v-icon,
        .v-btn--fab.v-size--small .v-icon,
        .v-btn--icon.v-size--default .v-icon,
        .v-btn--icon.v-size--small .v-icon,
        .v-icon.v-icon {
            font-size: 20px;
        }

        .link-to-page {
            :hover {
                cursor: pointer;
            }
        }

        .my-router-link {
            //font-size: 28px;
            width: 100%;
            text-decoration: none;
            word-break: break-word;

            &:hover {
            }
        }

        tr:hover {
            * {
                color: #121c36;
            }
        }
    }
}

@media (min-width: 1264px) {
    .table-view-posts {
        //min-width: 70vw;
        //margin-left: -10vw !important;
    }
}
</style>
