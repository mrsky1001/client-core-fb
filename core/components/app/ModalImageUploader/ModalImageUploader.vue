<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-dialog :value="showModal" @click:outside="setShowModal(false)">
        <v-card>
            <v-card-title> Загрузить изображение</v-card-title>
            <x-cropper :options="opts" @cropper-saved="callSaveImg" />
            <v-divider />
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
// @ts-ignore
import XCropper from 'x-cropper'
import 'x-cropper/dist/XCropper.css'
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'

@Component({
    components: { XCropper },
})
export default class ModalImageUploader extends Vue {
    @Prop() img: string
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Prop() setImg: (_: Blob) => void
    @Prop() showModal: boolean
    @Prop() cropperOptions: any
    @Prop() setShowModal: (_: boolean) => void

    defaultCropOptions = {
        layoutBreakpoint: 850,
        maxCropperHeight: 600,
        croppedAreaHeight: 400,
        croppedAreaWidth: 400,
        maxCroppedAreaWidth: 400,
        rotation: 0,
        quality: 0.85,
        handleSize: 10,
        aspectRatio: 1,
        maxCropAreaHeight: 0,
        frameLineDash: [5, 3],

        circleLabel: 'Круг',
        qualityLabel: 'Качество',
        cropAreaWidthLabel: 'Ширина области обрезки',
        cropAreaHeightLabel: 'Высота области обрезки',
        aspectRatioLabel: 'Соотношение сторон',
        cropParamsLabel: 'Параметры обрезки',
        proportionalLabel: 'Пропорционально',
        cropAreaYCoordLabel: 'Y - координата',
        cropAreaXCoordLabel: 'X - координата',
        clearLabel: 'Очистить',
        saveLabel: 'Сохранить',
        previewLabel: 'Предпоказ',
        cropAreaLabel: 'Изображение',
        fullCropAreaLabel: 'Выбрать все',
        rotateLeftLabel: 'Повернуть влево',
        rotateRightLabel: 'Повернуть вправо',
        selectBtnLabel: 'Выбрать изображение',
        flipVerticalLabel: 'Отразить по вертикали',
        flipHorizontalLabel: 'Отразить по горизонтали',
        dropareaLabel: 'Выберите или перетащите изображение...',
        cropAreaClasses: 'crop-area-classes',
    }

    get opts() {
        return Object.assign(this.defaultCropOptions, this.cropperOptions)
    }

    callSaveImg(file: Blob) {
        this.setImg(file)
        this.setShowModal(false)
    }
}
</script>

<style lang="scss">
.v-dialog {
    max-width: inherit !important;
    margin-top: -30px !important;
    width: auto !important;
    display: flex;
    justify-content: center;
    //
    .cropper .cropper-card .crop-area {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
    //.crop-area-classes {
    //    .cropper-main-card {
    //        padding-bottom: 25px;
    //    }

    //.cropper-preview-card {
    //    height: fit-content;
    //
    //    div {
    //        max-width: 200px;
    //        max-height: 150px;
    //
    //        img {
    //            transform: scale(0.3);
    //        }
    //    }
    //}
    //}
}

@media screen and (max-width: 580px) {
    .v-dialog {
        margin: 0 !important;
    }
}

@media screen and (min-width: 1000px) {
    .cropper-form-toolbar {
        > div {
            max-width: 300px;
            .row .col {
                min-width: 200px;
            }
        }
    }
}
</style>
