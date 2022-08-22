<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="annotation-img-container">
        <ModalImageMenu
            :show-modal="editST.isShowAnnImgMenuModal"
            :set-show-modal="editST.setIsShowAnnImgMenuModal"
            :delete-img="editST.deleteAnnImg"
            :upload-img="editST.uploadImg"
        />
        <ModalImageUploader
            :show-modal="editST.isShowAnnUploadModal"
            :set-show-modal="editST.setIsShowAnnUploadModal"
            :img="editST.post.annotation.imgUrl"
            :set-img="editST.saveAnnImg"
            :cropper-options="editST.annCropOpts"
        />
        <div v-if="!editST.post.annotation.imgUrl" class="upload-icon">
            <v-btn icon :disabled="editST.isNewPost" @click="editST.showUploadImg(true)">
                <v-icon>mdi-image</v-icon>
            </v-btn>
        </div>
        <div class="img-block">
            <div v-if="editST.post.annotation.imgUrl" class="my-annotation-img">
                <v-img
                    contain
                    max-width="300"
                    title="Изображение аннотации"
                    alt="Изображение аннотации"
                    :src="editST.post.annotation.imgUrl"
                ></v-img>
            </div>
            <div v-if="editST.post.annotation.imgUrl" class="img-params">
                <v-btn icon class="delete-icon" @click="editST.deleteAnnImg">
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { vxa } from '@/app/store/store.app'
import Component from 'vue-class-component'
import ModalImageMenu from '@/core/components/app/ModalImageUploader/ModalImageMenu.vue'
import ModalImageUploader from '@/core/components/app/ModalImageUploader/ModalImageUploader.vue'

@Component({
    components: { ModalImageUploader, ModalImageMenu },
})
export default class AnnotationImg extends Vue {
    editST = vxa.edit

    callUploadAnnotationImg() {
        // @ts-ignore
        this.$refs['imgAnnRef'] && this.$refs['imgAnnRef'].click()
    }
}
</script>

<style lang="scss" scoped>
.annotation-img-container {
    .upload-icon {
        display: flex;
        justify-content: center;
    }

    .img-block {
        .my-annotation-img {
            display: flex;
            justify-content: center;

            .v-image {
                border-radius: 15px;
            }
        }

        .delete-icon:hover {
            color: #00bd007d;
        }

        .img-params {
            display: flex;
            justify-content: center;

            .v-input {
                max-width: fit-content;
            }
        }
    }
}
</style>
