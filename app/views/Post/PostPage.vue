<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div v-if="postST.post" class="post-page">
        <delete-post></delete-post>
        <v-img class="annotation-img" :src="postST.post.annotation.imgUrl" />
        <p v-if="postST.post.annotation.imgAuthor" class="img-author">@{{ postST.post.annotation.imgAuthor }}</p>
        <flex-container>
            <post-left-bar />
            <post-main-container />
            <post-right-bar />
        </flex-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostRightBar from '@/app/views/Post/RightBar/PostRightBar.vue'
import PostMainContainer from '@/app/views/Post/MainContainer/PostMainContainer.vue'
import PostLeftBar from '@/app/views/Post/LeftBar/PostLeftBar.vue'
import { vxa } from '@/app/store/store.app'
import FlexContainer from '@/app/components/FlexContainer/FlexContainer.vue'
import DeletePost from '@/app/views/Post/extensions/DeletePost/DeletePost.vue'
import { getMetaInfo } from '@/core/lib/meta-info'

@Component({
    components: { FlexContainer, PostRightBar, DeletePost, PostMainContainer, PostLeftBar },
    metaInfo: getMetaInfo,
})
export default class PostPage extends Vue {
    postST = vxa.post

    mounted() {
        const postId = this.$route.params.postId
        const title = this.$route.params.title
        this.postST.getPost({ postId, title })
        window.scroll(0, 10)
    }
}
</script>
<style lang="scss">
.post-page {
    .my-router-link {
         font-size: 38px; line-height: normal;
    }

    .annotation-img {
        max-height: 720px !important;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .img-author {
        position: absolute;
        margin: -40px 0 0 10px;
        color: lightgray;
        font-weight: bolder;
        z-index: 0;
        font-size: large;
    }
}

@media screen and (max-width: 1000px) {
    .my-main-column {
        padding: 0 !important;
    }
}
</style>
