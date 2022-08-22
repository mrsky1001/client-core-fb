<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="annotation-header-img">
        <v-img
            v-if="editST.post && editST.post.annotation.imgUrl"
            class="annotation-img"
            :src="editST.post.annotation.imgUrl"
        ></v-img>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxa } from '@/app/store/store.app'
import Component from 'vue-class-component'

@Component
export default class AnnotationHeaderImg extends Vue {
    editST = vxa.edit
}
</script>

<style lang="scss" scoped>
.annotation-header-img {
    .img-author {
        position: absolute;
        margin: -40px 0 0 10px;
        color: lightgray;
        font-weight: bolder;
        z-index: 0;
        font-size: large;
    }
}
</style>
