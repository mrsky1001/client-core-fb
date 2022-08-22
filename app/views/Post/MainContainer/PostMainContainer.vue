<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <main-column>
        <post-sheet v-if="postST.post" :post="postST.post" />
    </main-column>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'
import MainColumn from '@/core/components/grid/MainColumn/MainColumn.vue'
import PostSheet from '@/app/views/Post/extensions/PostSheet/PostSheet.vue'

@Component({
    components: { MainColumn, PostSheet },
})
export default class PostMainContainer extends Vue {
    postST = vxa.post
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 400px) {
    .col-12 {
        padding: 0;
    }
}
</style>
