<!--
  - Copyright (©) 13.10.2021, 14:47. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-text-field
        v-show="navbar.isShowSearch"
        autofocus
        single-line
        hide-details
        placeholder="Что будем искать?"
        :value="navbar.searchText"
        @change="navbar.setSearchText"
        @focusout="navbar.setIsShowSearch(false)"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxc } from '@/core/store/store.vuex'

@Component
export default class SearchField extends Vue {
    navbar = vxc.appNavbar
}
</script>

<style lang="scss" scoped></style>
