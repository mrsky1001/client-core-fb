<!--
  - Copyright (c) 27.12.2021, 21:48  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <div class="menu-toolbar">
        <!--        <ModalImageMenu-->
        <!--            :show-modal="editST.isShowPostImgMenuModal"-->
        <!--            :set-show-modal="editST.setIsShowPostImgMenuModal"-->
        <!--            :delete-img="editST.deletePostImg"-->
        <!--            :upload-img="editST.uploadImg"-->
        <!--        />-->
        <ModalImageUploader
            :show-modal="editST.isShowPostUploadModal"
            :set-show-modal="editST.setIsShowPostUploadModal"
            :img="editST.selectedPostImg"
            :set-img="(file) => editST.savePostImg({ file })"
            :cropper-options="editST.postCropOpts"
        />
        <!--        <input v-show="false" ref="imageFileInputRef" multiple type="file" @change="callUploadImage" />-->
        <v-row>
            <template v-for="(row, parentIdx) in buttonsGroup">
                <div :key="`menu${parentIdx}`" class="menu-group">
                    <v-menu v-if="row.isDropDown" :key="`menu${parentIdx}`" offset-y>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                text
                                small
                                v-bind="attrs"
                                :title="row.title"
                                :class="editST.btnClasses(row) + ' menu-item'"
                                :disabled="row.isErrorNewPost && editST.isNewPost"
                                v-on="on"
                            >
                                <v-icon>{{ row.icon }}</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <menu-item
                                v-for="(btn, index) in row.buttons"
                                :key="`btn${parentIdx}_${index}`"
                                v-bind="btn"
                                :class="editST.btnClasses(btn)"
                                :disabled="!!(btn.isErrorNewPost && editST.isNewPost)"
                            ></menu-item>
                        </v-list>
                    </v-menu>
                    <menu-item
                        v-for="(btn, index) in row.buttons"
                        v-else
                        :key="`btn${parentIdx}_${index}`"
                        v-bind="btn"
                        :class="editST.btnClasses(btn)"
                        :disabled="!!(btn.isErrorNewPost && editST.isNewPost)"
                    ></menu-item>
                    <b :key="`splitter${parentIdx}`" class="splitter">|</b>
                </div>
            </template>
        </v-row>
    </div>
</template>

<script lang="ts">
import MenuItem from './MenuItem.vue'
import Component from 'vue-class-component'
import Vue from 'vue'
import { vxa } from '@/app/store/store.app'
import essentials from '@/app/views/EditPost/extensions/toolbar/buttonsGroup/essentials'
import textFormatting from '@/app/views/EditPost/extensions/toolbar/buttonsGroup/text-formatting'
import editorBtns from '@/app/views/EditPost/extensions/toolbar/buttonsGroup/editor-btns'
import paragraphFormatting from '@/app/views/EditPost/extensions/toolbar/buttonsGroup/paragraph-formatting'
import ModalImageMenu from '@/core/components/app/ModalImageUploader/ModalImageMenu.vue'
import ModalImageUploader from '@/core/components/app/ModalImageUploader/ModalImageUploader.vue'

@Component({
    components: {
        MenuItem,
        ModalImageMenu,
        ModalImageUploader,
    },
})
export default class MenuToolbar extends Vue {
    editST = vxa.edit
    buttonsGroup = [
        ...essentials(this.editST.editor, this.callSelectImage),
        ...textFormatting(this.editST.editor),
        ...paragraphFormatting(this.editST.editor),
        ...editorBtns(this.editST.editPost, this.editST.onShowPreview, this.editST.onPublishAndSave),
    ]

    callSelectImage() {
        this.editST.setIsShowPostUploadModal(true)
    }
}
</script>

<style lang="scss">
.menu-toolbar {
    margin: 5px 0 0 0;

    .row {
        padding: 0 !important;
    }

    top: 50px;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.08) 0 8px 16px !important;

    //border-bottom: 2px solid;
    position: fixed;
    background-color: white !important;
    z-index: 5;
    width: 100%;

    .row {
        height: 100%;
        padding: 25px 15px 20px 10px;
        display: flex;
        justify-content: center;

        .menu-group {
            display: flex;
            justify-content: space-around;
        }

        .splitter {
            font-size: 1rem;
            opacity: 0.5;
        }
    }

    //
    //.divider {
    //  //width: 2px;
    //  //height: 1.25rem;
    //  //margin-left: 0.5rem;
    //  //margin-right: 0.75rem;
    //}

    .menu-item {
        min-width: 2rem !important;
        max-width: 2rem !important;
        width: 2rem !important;
        padding: 5px;
        opacity: 0.65;
        margin: 2px;
        color: black;

        &.is-active,
        &:hover {
            opacity: 1;
            color: white;
            //background-color: #00bd007d;
        }
    }
}
</style>
