<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div
        v-if="editor"
        :class="{
            'character-count': true,
            'character-count--warning': editor.storage.characterCount.characters() === limit,
        }"
    >
        <!--        <svg height="20" width="20" viewBox="0 0 20 20" class="character-count__graph">-->
        <!--            <circle r="10" cx="10" cy="10" fill="#e9ecef"></circle>-->
        <!--            <circle-->
        <!--                r="5"-->
        <!--                cx="10"-->
        <!--                cy="10"-->
        <!--                fill="transparent"-->
        <!--                stroke="currentColor"-->
        <!--                stroke-width="10"-->
        <!--                :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"-->
        <!--                transform="rotate(-90) translate(-20)"-->
        <!--            ></circle>-->
        <!--            <circle r="6" cx="10" cy="10" fill="white"></circle>-->
        <!--        </svg>-->

        <!--        <div class="character-count__text">-->
        <!--            {{ editor.storage.characterCount.characters() }}/{{ limit }} - символов в статье-->
        <!--        </div>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Editor } from '@tiptap/vue-2'
import Component from 'vue-class-component'

@Component
export default class Mentions extends Vue {
    @Prop() editor: Editor
    @Prop() limit: number

    percentage() {
        return Math.round((100 / this.limit) * this.editor.storage.characterCount.characters())
    }
}
</script>

<style scoped></style>
