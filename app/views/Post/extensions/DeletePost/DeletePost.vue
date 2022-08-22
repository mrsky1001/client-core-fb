<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-row v-if="postST.isShowDeleteModal" justify="center">
        <v-dialog v-model="postST.isShowDeleteModal" style="position: absolute" max-width="600">
            <v-card>
                <v-card-title class="headline lighten-2"> Вы действительно хотите удалить статью?</v-card-title>
                <v-card-text>
                    Статья под заголовком <b>"{{ postST.post ? postST.post.title : '' }}"</b> будет удалена!
                </v-card-text>
                <v-divider />

                <v-card-actions>
                    <v-spacer />
                    <v-btn color="green darken-1" text @click="() => postST.setShowDeleteModal(false)"> Отмена</v-btn>
                    <v-btn color="red darken-1" text @click="postST.deletePost(postST.post.id)"> Да, удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'
import { Watch } from 'vue-property-decorator'

@Component
export default class DeletePost extends Vue {
    postST = vxa.post
}
</script>

<style scoped></style>
