<!--
  - Copyright (c) 04.01.2022, 23:03  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <node-view-wrapper>
        <div
            v-if="isLoaded"
            style="position: absolute"
            :title="node.attrs.src.substring(node.attrs.src.lastIndexOf('/') + 1)"
        >
            <vue-drag-resize
                :is-draggable="true"
                :is-active="false"
                :prevent-active-behavior="false"
                :snap-to-grid="true"
                :w="getWidth"
                :h="getHeight"
                :y="getTop"
                :x="getLeft"
                :grid-y="20"
                :grid-x="20"
                @resizing="resize"
                @dragging="resize"
            >
            </vue-drag-resize>
        </div>
        <img ref="imgRef" :src="node.attrs.src" :style="style" />
    </node-view-wrapper>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Component from 'vue-class-component'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-2'
// @ts-ignore
import VueDragResize from 'vue-drag-resize'
import { NodeViewProps } from '@tiptap/core'

@Component({
    components: { NodeViewWrapper, NodeViewContent, VueDragResize },
})
export default class ImgResizer extends Vue {
    @Prop() readonly node!: NodeViewProps
    @Prop() readonly extension!: Node
    @Prop() readonly updateAttributes!: (_attributes: { style: string }) => void

    // @ts-ignore
    style = this.node.attrs.style
    tempImg: HTMLImageElement | null = null
    isLoaded = false

    width = 0
    height = 0
    top = 0
    left = 0

    private parseNumberCSSProp = (name: string) => {
        const elem = this.style.split(';').find((el: string) => el.includes(name))
        if (elem) {
            const nameMatch = name.match(/-/g)
            const elemMatch = elem.match(/-/g)

            const countNameMinus = nameMatch ? nameMatch.length : 0
            const countMinus = elemMatch ? elemMatch.length : 0
            const minus = countNameMinus < countMinus ? '-' : ''

            return elem ? minus + elem.replace(/[^0-9]/g, '') : 0
        }

        return 0
    }

    getProp(propName: string): number | string | undefined {
        const prop = this.parseNumberCSSProp(propName)

        if (prop) {
            return Number(prop)
        } else {
            // @ts-ignore
            return this[propName]
        }
    }

    get getWidth() {
        return this.getProp('width')
    }

    get getHeight() {
        return this.getProp('height')
    }

    get getTop() {
        return this.getProp('margin-top')
    }

    get getLeft() {
        return this.getProp('margin-left')
    }

    updateStyle(newRect: { width: number; height: number; top: number; left: number }) {
        const style = `width:${newRect.width}px; height:${newRect.height}px; margin-top:${newRect.top}px; margin-left:${newRect.left}px;`
        this.style = style
        this.updateAttributes({ style })
    }

    mounted() {
        this.tempImg = this.$refs.imgRef ? (this.$refs.imgRef as HTMLImageElement) : null

        if (this.tempImg !== null) {
            this.tempImg.onload = () => {
                this.width = this.tempImg ? this.tempImg.width : 200
                this.height = this.tempImg ? this.tempImg.height : 200
                this.top = this.tempImg ? this.tempImg.offsetTop : 0
                this.left = this.tempImg ? this.tempImg.offsetLeft : 0
                this.isLoaded = true
            }
        }
    }

    resize(newRect: { width: number; height: number; top: number; left: number }) {
        this.updateStyle(newRect)
    }
}
</script>

<style scoped></style>
