<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)

@Component
export default class VueHighlightjs extends Vue {
    @Prop() autoDetect!: boolean
    @Prop() code!: string

    escapeHTML = (value: string) => {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
    }

    mounted() {
        const result = hljs.highlightAuto(this.code)
        const detectedLanguage = result.language

        console.log(detectedLanguage)
        console.log(hljs.listLanguages())
    }
}
</script>

<style scoped lang="scss"></style>
