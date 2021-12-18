<!--
  - Copyright (©) 13.10.2021, 14:47. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-text-field
        v-show="self.isShowSearch"
        autofocus
        single-line
        hide-details
        placeholder="Что будем искать?"
        :value="self.searchText"
        @change="self.setSearchText"
        @focusout="setIsShowSearch(false)"
    />
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxc } from '@/core/store/store.vuex'

@Component
export default class SearchField extends Vue {
    self = vxc.appNavbar
}
</script>

<style lang="scss" scoped></style>
