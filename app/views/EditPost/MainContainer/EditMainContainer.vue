<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <main-column class="main-edit-container">
        <menu-toolbar></menu-toolbar>
        <annotation-card />
        <br />

        <br />
        <v-sheet shaped>
            <v-card-text class="my-body-card-text">
                <v-row>
                    <v-col cols="12">
                        <editor-content
                            v-cloak
                            class="my-editor"
                            :editor="editST.editor"
                            @drop.prevent="editST.dropImg"
                            @dragover.prevent
                        ></editor-content>
                        <!--                        <mentions v-if="editor" :editor="editor" :limit="10000"></mentions>-->
                    </v-col>
                </v-row>
            </v-card-text>
        </v-sheet>
        <div class="btns">
            <v-btn class="float-right secondary" @click="() => editST.save()">
                <v-icon>mdi-content-save-outline</v-icon>
                Сохранить
            </v-btn>
            <v-btn class="float-right accent" @click="() => editST.onPublishAndSave()">
                <v-icon>mdi-upload</v-icon>
                Опубликовать
            </v-btn>
        </div>
    </main-column>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import MainColumn from '@/core/components/grid/MainColumn/MainColumn.vue'
import MenuToolbar from '../extensions/toolbar/MenuToolbar.vue'
import AnnotationCard from '@/app/views/EditPost/extensions/annotation/AnnotationCard.vue'
import { vxa } from '@/app/store/store.app'
import { EditorContent } from '@tiptap/vue-2'
import ImagesGrid from '@/app/views/EditPost/extensions/ImagesGrid.vue'
import SectionEditor from '@/app/views/EditPost/extensions/sectionEditor/EditSectionEditor.vue'

@Component({
    components: {
        SectionEditor,
        ImagesGrid,
        AnnotationCard,
        MenuToolbar,
        MainColumn,
        // Mentions,
        EditorContent,
    },
})
export default class MainContainer extends Vue {
    editST = vxa.edit
    e6 = 1

    mounted() {
        this.editST.autoSave()
    }
}
</script>

<style lang="scss">
.main-edit-container {
    z-index: auto !important;
    //margin: 40px 0;

    .btns {
        padding: 0 20px 0 20px;

        > * {
            margin: 0 0 0 10px;
        }
    }

    .my-editor {
        min-height: 1000px;

        > :focus {
            outline: none !important;
        }
    }

    img {
        max-width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #68cef8;
        }
    }
}

@media screen and (max-width: 1000px) {
    .my-body-card-text {
        padding: 0 !important;
        margin: 0 !important;
    }
}

@media screen and (max-width: 1221px) {
    .my-editor {
        //width: 90vw;
    }
}
</style>
