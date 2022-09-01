<!--
  - Copyright (©) 27.07.2021, 10:04. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-row>
        <v-col v-if="posts.length" lg="12" cols="12">
            <template v-for="(post, index) in posts">
                <post-annotation :key="index" :post="post" />
            </template>
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
import { Watch } from 'vue-property-decorator'

@Component({
    components: { PostAnnotation },
})
export default class CardViewPosts extends Vue {
    homeST = vxa.home
    posts = this.homeST.posts
    isChangedType = false

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
<style scoped lang="scss">
.my-sheet {
    margin: 0 0 50px 0;
}
</style>
