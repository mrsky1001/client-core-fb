<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="edit-tools">
        <div>
            <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel>
                    <v-expansion-panel-header>Изображения статьи</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row v-if="editST.postImgs.length">
                            <v-col v-for="imgUrl in editST.postImgs" :key="imgUrl" class="d-flex child-flex" cols="4">
                                <v-img
                                    :src="imgUrl"
                                    aspect-ratio="1"
                                    class="grey lighten-2"
                                    :title="imgUrl.substring(imgUrl.lastIndexOf('/') + 1)"
                                >
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular
                                                indeterminate
                                                color="grey lighten-5"
                                            ></v-progress-circular>
                                        </v-row>
                                    </template>
                                    <v-row class="menu-img fill-height" align="center">
                                        <v-btn
                                            color="white"
                                            fab
                                            x-small
                                            title="Добавить изображение в текущую позицию"
                                            @click="addImg(imgUrl)"
                                        >
                                            <v-icon>mdi-upload</v-icon>
                                        </v-btn>
                                        <v-btn
                                            color="white"
                                            fab
                                            x-small
                                            title="Удалить изображение с сервера"
                                            @click="editST.deletePostImg(imgUrl)"
                                        >
                                            <v-icon>mdi-trash-can-outline</v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'

@Component
export default class ImagesGrid extends Vue {
    editST = vxa.edit
    panel = false

    addImg(img: string) {
        this.editST.editor.chain().setImage({ src: img }).run()
    }
}
</script>

<style scoped lang="scss">
.edit-tools {
    display: flex;
    position: sticky;
    top: 100px;
    min-width: 400px;
    padding: 0 20px;

    > div {
        max-width: 400px;
        width: 100%;
    }
}

.v-image {
    .menu-img {
        display: none;
    }

    :hover {
        .menu-img {
            display: flex;
            justify-content: space-evenly;
        }
    }
}

@media screen and (max-width: 1250px) {
    .edit-tools {
        > div {
            max-width: 100%;
        }
    }
}
</style>
