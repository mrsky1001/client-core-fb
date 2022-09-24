<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <node-view-wrapper class="code-block">
        <select v-model="selectedLanguage" contenteditable="false">
            <option :value="null">auto</option>
            <option disabled>------ -_- -------</option>
            <option v-for="(language, index) in languages" :key="index" :value="language">
                {{ language }}
            </option>
        </select>
        <pre><node-view-content as="code"></node-view-content></pre>
    </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'

export default {
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },

    props: nodeViewProps,

    data() {
        return {
            languages: this.extension.options.lowlight.listLanguages(),
        }
    },

    computed: {
        selectedLanguage: {
            get() {
                return this.node.attrs.language
            },
            set(language) {
                this.updateAttributes({ language })
            },
        },
    },
}
</script>

<style lang="scss">
.code-block {
    position: relative;

    select {
        color: whitesmoke;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 2px;

        option {
            color: black;
        }
    }
}
</style>
