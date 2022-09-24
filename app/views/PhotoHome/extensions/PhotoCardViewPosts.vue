<!--
  - Copyright (©) 27.07.2021, 10:04. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-row>
        <v-col
            v-for="photoPost in post.photoPosts"
            :key="photoPost.title"
            class="d-flex child-flex"
            :cols="photoPost.size"
        >
            <v-hover v-slot:default="{ hover }">
                <div class="img-container">
                    <div v-show="hover" class="img-actions">
                        <v-btn
                            fab
                            small
                            :class="hasLikePhotoPost(photoPost) ? 'isLiked' : ''"
                            :disabled="!authST.isAuth"
                            :title="!authST.isAuth ? exceptions.NOT_ALLOWED_LIKE.text : 'Мне нравится'"
                            :style="!authST.isAuth ? { 'background-color': 'rgba(255, 255, 255, 50%) !important' } : ''"
                            @click="
                                postST.setPost(post)
                                postST.setPhotoLike(photoPost)
                            "
                        >
                            <v-icon>mdi-heart-multiple-outline</v-icon>
                        </v-btn>
                        <v-menu v-if="authST.isEditor" v-show="hover" bottom left>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn fab small v-bind="attrs" v-on="on">
                                    <v-icon>mdi-image-size-select-large</v-icon>
                                </v-btn>
                            </template>

                            <v-list class="img-sizer">
                                <v-list-item
                                    v-for="(size, i) in photoSizes"
                                    :key="i"
                                    :class="`sizer-item ${photoPost.size === size ? 'sizer-item__active' : ''}`"
                                    active-class="sizer-item__active"
                                    @click="
                                        postST.setPost(post)
                                        postST.onChangeSizePhotoImg({ photoPost, size })
                                    "
                                >
                                    <v-list-item-title>{{ size }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <router-link :to="`/post-id/${post.id}`">
                        <v-img :src="photoPost.url" class="grey lighten-2 img-class">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                            </template>

                            <transition name="fade" duration="1" enter-class="show" leave-active-class="hide">
                                <div v-show="hover" :id="`imgOverlay${photoPost.title}`" class="img-overlay">
                                    <div class="img-overlay__title">
                                        <h4>{{ photoPost.title }}</h4>
                                    </div>
                                    <div
                                        :id="`imgDescriptionOverlay${photoPost.title}`"
                                        class="img-overlay__content"
                                        v-html="photoPost.description"
                                    >
                                        <div class="overlay-text"></div>
                                    </div>
                                </div>
                            </transition>
                        </v-img>
                    </router-link>
                </div>
            </v-hover>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostAnnotation from '@/app/views/Post/extensions/PostAnnotation/PostAnnotation.vue'
import { vxa } from '@/app/store/store.app'
import homeViewTypes from '@/core/collections/home-view-types'
import statuses from '@/core/collections/statuses'
import { Prop, Watch } from 'vue-property-decorator'
import { IPost } from '@/core/models/interfaces/article/IPost'
import photoSizes from '@/core/collections/photo-sizes'
import { vxc } from '@/core/store/store.vuex'
import exceptions from '@/core/collections/exceptions'
import IPhotoPost from '@/core/models/interfaces/article/IPhotoPost'

@Component({
    components: { PostAnnotation },
})
export default class CardViewPosts extends Vue {
    homeST = vxa.home
    authST = vxc.auth
    postST = vxa.post
    exceptions = exceptions
    posts = this.homeST.posts
    isChangedType = false
    photoSizes = photoSizes
    @Prop() post: IPost

    @Watch('homeST.posts')
    afterPosts() {
        this.posts = this.homeST.posts
    }

    hasLikePhotoPost(photoPost: IPhotoPost) {
        return photoPost.likes.includes(vxc.auth.user.id)
    }

    @Watch('homeST.typeHomeView')
    @Watch('homeST.posts')
    afterChangeType() {
        this.isChangedType = true

        if (this.homeST.typeHomeView === homeViewTypes.DRAFT.number) {
            this.posts = this.homeST.posts.filter((p) => p.status === statuses.DRAFT.value)
        } else if (this.homeST.typeHomeView === homeViewTypes.PUBLISHED.number) {
            this.posts = this.homeST.posts.filter((p) => p.status === statuses.PUBLISHED.value)
        } else {
            this.posts = this.homeST.posts
        }
    }

    mounted() {
        this.afterChangeType()
    }
}
</script>
<style lang="scss">
.my-sheet {
    margin: 0 0 50px 0;
}

.img-class {
    position: relative;
}

.img-overlay {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: flex-start;
    position: absolute;
    padding: 0 20px 20px 20px;

    color: white;
    /* box-shadow: 0px 100px 100px #000 inset; */
    //box-shadow: 0 -151px 83px -60px black inset;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.52), transparent);
    //transition: box-shadow 10s ease-in-out;

    p {
        margin: 0 !important;
    }

    .img-overlay__content {
        //padding: 50px;
        height: 10vh;
        overflow: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;

        p {
            margin-bottom: 0 !important;
        }

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }

        &:before {
            content: '';
            height: 70px;
            width: 100%;
            bottom: 0;
            left: 0;
            position: absolute;
            background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
        }

        //.overlay-text {
        //    height: 100%;
        //    width: 100%;
        //    box-shadow: 0 -151px 83px -60px black inset;
        //}
    }

    transition: all 0.5s ease-in-out;
}

.show {
    background: linear-gradient(to top, rgba(0, 0, 0, 0), transparent);
    opacity: 0.5;
}

.hide {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
    opacity: 1;
}

.row {
    align-items: center;

    .col {
        min-width: 300px;
    }
}

.img-container {
    position: relative;

    > .img-actions {
        width: 100%;
        display: flex;
        justify-content: end;
        position: absolute;
        z-index: 1;
        top: 10px;
        right: 10px;

        > .v-btn {
            opacity: 0.5;

            &.isLiked {
                color: red;
                opacity: 1;
            }

            &:hover {
                opacity: 1;
            }
        }

        > * {
            margin-left: 10px;
        }
    }
}

.img-sizer {
    .sizer-item {
        text-align: center;
    }

    .sizer-item__active {
        color: #000000;
        background: lightgray;
    }
}

@media screen and (max-width: 850px) {
    .row {
        justify-content: center;
    }
}

@media screen and (max-width: 320px) {
    .row {
        .col {
            min-width: 90vw;
        }
    }
}
</style>
