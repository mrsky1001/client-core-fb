<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="my-post-container">
        <div class="post-content">
            <div class="ProseMirror">
                <blockquote class="content-annotation">
                    {{ post.annotation.text }}
                </blockquote>
            </div>
            <div class="ProseMirror" v-html="post.content" />
            <!--            <vue-highlightjs autodetect :code=""/>-->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { IPost } from '@/core/models/interfaces/article/IPost'
import Component from 'vue-class-component'
import VueHighlightjs from '@/core/components/highlightjs/vue-highlightjs.vue'

@Component({
    components: { VueHighlightjs },
})
export default class PostContent extends Vue {
    @Prop() post!: IPost
}
</script>

<style lang="scss">
.my-post-container {
    .content-annotation {
        margin-top: 40px;
        color: #8a8a8a;
        font-weight: 300;
        font-style: italic;
    }

    .my-rounded-up {
        border-radius: 3px !important;
    }

    //p {
    //  word-break: break-all;
    //}

    .my-img-title {
        text-align: center;
        font-style: italic;
        color: grey;
    }
}
</style>
