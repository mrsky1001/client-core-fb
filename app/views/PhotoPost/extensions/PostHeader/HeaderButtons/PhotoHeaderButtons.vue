<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="header-buttons">
        <v-menu offset-y left>
            <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item :to="postST.getEditPostRoute(post)">
                    <v-list-item-icon>
                        <v-icon size="large" color="lighten-1 mb-2"> mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Редактировать</v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-if="isPublished()"
                    @click="() => postST.onChangeStatus({ postId: post.id, status: statuses.DRAFT.value })"
                >
                    <v-list-item-icon>
                        <v-icon size="large" color="red lighten-1 mb-2"> mdi-upload-off</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Снять с публикации</v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-if="!isPublished()"
                    @click="() => postST.onChangeStatus({ postId: post.id, status: statuses.PUBLISHED.value })"
                >
                    <v-list-item-icon>
                        <v-icon size="large" color="green lighten-1 mb-2"> mdi-upload</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Опубликовать</v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="
                        postST.setPost(post)
                        postST.setShowDeleteModal(true, post)
                    "
                >
                    <v-list-item-icon>
                        <v-icon size="large" color="red lighten-1 mb-2"> mdi-trash-can-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Удалить</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import statuses from '@/core/collections/statuses'
import { vxa } from '@/app/store/store.app'
import { IPost } from '@/core/models/interfaces/article/IPost'
import { Prop } from 'vue-property-decorator'

@Component
export default class HeaderButtons extends Vue {
    postST = vxa.post

    @Prop() post!: IPost

    statuses = statuses
    isPublished = () => this.post.status === statuses.PUBLISHED.value
}
</script>

<style lang="scss">
.header-buttons {
    //padding-top: 22px;
}

.v-btn--active::before {
    background-color: transparent;
}

.v-btn--active:hover::before {
    background-color: currentColor !important;
}
</style>
