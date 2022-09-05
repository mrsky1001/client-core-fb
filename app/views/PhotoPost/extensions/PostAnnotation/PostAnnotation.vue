<!--
  - Copyright (c) 08.12.2021, 19:08  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <v-sheet ref="mySheet" rounded="lg" class="my-sheet">
        <v-card>
            <post-header :post="post" />
            <v-card-text class="my-card-text">
                {{ post.annotation.text }}
            </v-card-text>
            <v-row class="tags-footer">
                <div class="left-col">
                    <div class="tags">
                        <template v-for="t in post.tags.slice(0, 5)">
                            {{ ' #' + t }}
                        </template>
                    </div>
                </div>
            </v-row>
            <router-link v-if="isShowImg" :to="postST.getPostRoute(post)">
                <v-img class="annotation-img" :src="post.annotation.imgUrl" @error="isErrAva" />
            </router-link>
            <div class="footer-annotation">
                <div>
                    <span class="date-annotation">
                        {{ postST.dateToStringFormat(post.publishedDate) }}
                    </span>
                </div>
                <div>
                    <v-card-actions>
                        <v-btn
                            text
                            right
                            class="btn-read font-weight-bold font-weight-medium"
                            :to="postST.getPostRoute(post)"
                        >
                            Читать
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-card-actions>
                </div>
            </div>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import routesObj from '@/app/routes/routes-obj'
import { vxa } from '@/app/store/store.app'
import { Prop } from 'vue-property-decorator'
import { IPost } from '@/core/models/interfaces/article/IPost'
import PostHeader from '@/app/views/Post/extensions/PostHeader/PostHeader.vue'

@Component({
    components: { PostHeader },
})
export default class PostAnnotation extends Vue {
    postST = vxa.post

    @Prop() post!: IPost

    isShowImg = true
    routesObj = routesObj

    isErrAva(e: Error) {
        if (e) this.isShowImg = false
    }

    mounted() {
        const observerPost = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const square = entry.target
                    if (square) {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                square.classList.remove('post-sheet__off-box-shadow')
                                square.classList.add('post-sheet__box-shadow')
                                return // if we added the class, exit the function
                            }, 1000)
                        }

                        // We're not intersecting, so remove the class!
                        square.classList.add('post-sheet__off-box-shadow')
                        square.classList.remove('post-sheet__box-shadow')
                    }
                })
            },
            { rootMargin: '-0px', threshold: 0.4 }
        )

        if (window.innerWidth < 801) {
            document.querySelectorAll('.my-sheet').forEach((sheet) => {
                observerPost.observe(sheet)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.post-sheet__box-shadow {
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1) !important;
    transition: box-shadow 0.3s ease-in-out;
}

.post-sheet__off-box-shadow {
    box-shadow: none !important;
    transition: box-shadow 0.3s ease-in-out;
}

.my-sheet {
    .date-annotation {
        color: gray;

        font-size: smaller;
    }

    .v-card,
    .v-sheet {
        box-shadow: none !important;
        transition: box-shadow 0.3s ease-in-out;
    }

    .v-sheet:hover,
    .post-sheet__box-shadow {
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1) !important;
        transition: box-shadow 0.3s ease-in-out;
    }

    .tags-footer {
        padding: 0 20px 10px 20px;
        font-size: small;
        color: gray;

        .left-col {
            padding: 0;
        }
    }

    .footer-annotation {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0 5px 0;

        > * {
            margin: 0 8px 0 20px;
        }
    }

    .v-btn.btn-read {
        color: gray;
    }

    .v-btn.btn-read:hover {
        color: black;
    }

    .annotation-img {
        //min-height: 250px;
        margin: 0 15px 0 15px;
    }

    .my-card-text {
        font-size: large;
    }
}
</style>
