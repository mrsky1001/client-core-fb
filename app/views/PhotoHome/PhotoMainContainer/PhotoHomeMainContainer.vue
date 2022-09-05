<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <main-column class="home-main-column">
        <div v-if="homeST.posts.length">
            <div class="to-up-block" @click="goToUp">
                <v-btn icon x-large>
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </div>
            <!--            <type-cards-bar />-->
            <!--            <table-view-posts v-if="homeST.typeHomeView === types.TABLE.number" />-->
            <div v-for="post in homeST.posts" :key="post.id" class="photo-post">
                <v-row class="photo-post-header">
                    <v-col cols="12">
                        <router-link :to="`/post-id/${post.id}`">
                            <h3 class="post-photo__header">{{ post.title }}</h3>
                        </router-link>
                    </v-col>
                    <v-col>
                        <v-card-actions class="my-card-actions">
                            <v-list-item class="my-list-item">
                                <v-list-item-avatar v-if="post.author.avatar && !hasErrorImg" class="user-avatar">
                                    <v-img :src="post.author.avatar" @error="errorImgEvent" />
                                </v-list-item-avatar>
                                <v-list-item-avatar v-if="hasErrorImg" class="user-avatar">
                                    <v-icon> mdi-panda </v-icon>
                                </v-list-item-avatar>
                                <v-list-item-action-text>
                                    <v-list-item-title>@{{ post.author.username }}</v-list-item-title>
                                </v-list-item-action-text>
                                <v-row align="center" justify="end" class="my-row-item-action">
                                    <v-list-item-action-text
                                        v-if="authST.isEditor"
                                        :title="postST.statusObj(post.status).text"
                                    >
                                        <v-list-item-title>
                                            <v-icon small :color="postST.statusObj(post.status).color">
                                                {{ postST.statusObj(post.status).icon }}
                                            </v-icon>
                                        </v-list-item-title>
                                    </v-list-item-action-text>

                                    <v-list-item-action-text v-show="post.readTime > 0" title="Время чтения">
                                        <v-list-item-title>
                                            <v-icon small> mdi-clock-outline</v-icon>
                                            {{ post.readTime }} мин.
                                        </v-list-item-title>
                                    </v-list-item-action-text>
                                    <v-list-item-action-text v-show="post.likes.length > 0" title="Нравится">
                                        <v-list-item-title>
                                            <v-icon small> mdi-thumb-up-outline</v-icon>
                                            {{ post.likes.length }}
                                        </v-list-item-title>
                                    </v-list-item-action-text>
                                    <v-list-item-action-text v-show="post.countComments > 0" title="Комментарии">
                                        <v-list-item-title>
                                            <v-icon small> mdi-comment-text-outline</v-icon>
                                            {{ post.countComments }}
                                        </v-list-item-title>
                                    </v-list-item-action-text>
                                    <v-list-item-action-text v-show="post.views" title="Просмотров">
                                        <v-list-item-title>
                                            <v-icon small> mdi-eye-outline</v-icon>
                                            {{ post.views }}
                                        </v-list-item-title>
                                    </v-list-item-action-text>
                                    <header-buttons v-if="authST.isEditor" :post="post" />
                                </v-row>
                            </v-list-item>
                        </v-card-actions>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <photo-card-view-posts v-if="homeST.typeHomeView !== types.TABLE.number" :post="post" />
            </div>
        </div>
        <no-section-post v-if="!homeST.posts.length && isLoaded && !homeST.isNoFound"></no-section-post>
        <no-posts v-if="homeST.isNoFound && isLoaded"></no-posts>
        <v-progress-circular v-if="homeST.loading" class="posts-loader" indeterminate size="32"></v-progress-circular>
        <div class="footer-actions">
            <v-btn text right :disabled="homeST.loading" @click="homeST.getPosts()"> Ещё</v-btn>
        </div>
    </main-column>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxc } from '@/core/store/store.vuex'
import TypeCardsBar from '@/app/views/Home/extensions/TypeCardsBar.vue'
import TableViewPosts from '@/app/views/Home/extensions/tablePosts/TableViewPosts.vue'
import MainColumn from '@/core/components/grid/MainColumn/MainColumn.vue'
import CardViewPosts from '@/app/views/Home/extensions/CardViewPosts.vue'
import { vxa } from '@/app/store/store.app'
import NoSectionPost from '@/app/components/NoSectionPosts/NoSectionPost.vue'
import NoPosts from '@/app/components/NoPosts/NoPosts.vue'
import { Watch } from 'vue-property-decorator'
import homeViewTypes from '@/core/collections/homeViewTypes'
import PhotoCardViewPosts from '@/app/views/PhotoHome/extensions/PhotoCardViewPosts.vue'

@Component({
    components: { PhotoCardViewPosts, NoPosts, NoSectionPost, TypeCardsBar, TableViewPosts, CardViewPosts, MainColumn },
})
export default class PhotoHomeMainContainer extends Vue {
    homeST = vxa.home
    postST = vxa.post
    authST = vxc.auth
    isLoaded = false
    hasErrorImg = false

    types = homeViewTypes
    filter = {
        justPublished: false,
        justDraft: false,
        sortNew: true,
        sortPopular: true,
        sortOld: false,
        all: false,
    }

    errorImgEvent(err: string) {
        if (err) this.hasErrorImg = true
        else this.hasErrorImg = false
    }

    mounted() {
        this.homeST.getSections()

        setTimeout(() => {
            this.isLoaded = true
        }, 1000)
    }

    @Watch('homeST.posts')
    onPostsUpdated() {
        this.isLoaded = false
        setTimeout(() => {
            this.isLoaded = true
        }, 300)
    }

    goToUp() {
        window.scroll(0, 0)
    }
}
</script>
<style lang="scss" scoped>
.photo-post-header{
  header
}

.footer-actions {
    display: flex;
    justify-content: center;

    .v-btn {
        color: gray;
        font-weight: bold;
    }

    .v-btn:hover {
        color: black;
    }
}

.posts-loader {
    width: 100% !important;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
}

.to-up-block {
    z-index: 3;
    position: fixed;
    top: 90%;
    right: 6%;
    opacity: 26%;

    .v-btn {
        background: white;
    }

    &:hover {
        opacity: 100%;
    }
}

.post-photo__header {
    font-size: xx-large;
    font-weight: 100;
}

.home-main-column {
    max-width: 100%;
    position: relative;
    z-index: 3;
    padding: 0 2% 0 5%;
    .photo-post {
        margin: 0 0 100px 0;
    }
}
</style>
