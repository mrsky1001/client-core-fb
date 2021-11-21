<!--
  - Copyright (©) 13.10.2021, 14:47. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-text-field
        autofocus
        single-line
        hide-details
        placeholder="Что будем искать?"
        v-show="isShowSearch"
        :value="searchText"
        @change="setSearchText"
        @focusout="setIsShowSearch(false)"
    ></v-text-field>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import navbarStore from '@/core/store/app/app-navbar.store'

import { mapMutations, mapState } from 'vuex'

@Component({
    store: navbarStore,
    computed: {
        ...mapState(['searchText', 'isShowSearch']),
    },
    methods: {
        ...mapMutations(['setSearchText', 'setIsShowSearch']),
    },
})
export default class SearchField extends Vue {}
</script>

<style lang="scss" scoped></style>
