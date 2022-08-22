<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-combobox
        chips
        clearable
        multiple
        validate-on-blur
        outlined
        small-chips
        label="Тэги и ключевые слова для поисковика (чем больше тем лучше):"
        :items="items"
        :value="editST.post.tags"
        @change="(val) => (editST.post.tags = val)"
    >
        <template #selection="{ attrs, item, select, selected }">
            <v-chip
                small
                close
                v-bind="attrs"
                :input-value="selected"
                @click="select"
                @click:close="editST.post.removeTag(item)"
            >
                {{ item }}
            </v-chip>
        </template>
    </v-combobox>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'
import { vxc } from '@/core/store/store.vuex'

@Component
export default class Tags extends Vue {
    editST = vxa.edit
    routerST = vxc.router
    items: string[] = []
}
</script>

<style scoped></style>
