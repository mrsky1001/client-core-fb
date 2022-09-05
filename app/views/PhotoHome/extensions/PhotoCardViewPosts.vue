<!--
  - Copyright (©) 27.07.2021, 10:04. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-row>
        <v-col v-for="img in post.photoImages" :key="img.title" class="d-flex child-flex" :cols="img.size">
            <v-hover v-slot:default="{ hover }">
                <router-link :to="`/post-id/${post.id}`">
                    <v-img :src="img.url" class="grey lighten-2 img-class">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>

                        <transition name="fade" duration="1" enter-class="show" leave-active-class="hide">
                            <div v-show="hover" :id="`imgOverlay${img.title}`" class="img-overlay">
                                <div class="img-overlay__title">
                                    <h4>{{ img.title }}</h4>
                                </div>
                                <div
                                    :id="`imgDescriptionOverlay${img.title}`"
                                    class="img-overlay__content"
                                    v-html="img.description"
                                >
                                    <div class="overlay-text"></div>
                                </div>
                            </div>
                        </transition>
                    </v-img>
                </router-link>
            </v-hover>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostAnnotation from '@/app/views/Post/extensions/PostAnnotation/PostAnnotation.vue'
import { vxa } from '@/app/store/store.app'
import homeViewTypes from '@/core/collections/homeViewTypes'
import statuses from '@/core/collections/statuses'
import { Prop, Watch } from 'vue-property-decorator'
import { IPost } from '@/core/models/interfaces/article/IPost'

@Component({
    components: { PostAnnotation },
})
export default class CardViewPosts extends Vue {
    homeST = vxa.home
    posts = this.homeST.posts
    isChangedType = false
    @Prop() post: IPost

    @Watch('homeST.posts')
    afterPosts() {
        this.posts = this.homeST.posts
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
