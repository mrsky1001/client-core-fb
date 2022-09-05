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
                <v-row>
                    <v-col cols="12">
                        <h3 class="post-photo__header">{{ post.title }}</h3>
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
    authST = vxc.auth
    isLoaded = false

    types = homeViewTypes
    filter = {
        justPublished: false,
        justDraft: false,
        sortNew: true,
        sortPopular: true,
        sortOld: false,
        all: false,
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
