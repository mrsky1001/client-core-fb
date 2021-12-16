<!--
  - Copyright (©) 13.10.2021, 14:47. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <v-text-field
    v-show="isShowSearch"
    autofocus
    single-line
    hide-details
    placeholder="Что будем искать?"
    :value="searchText"
    @change="setSearchText"
    @focusout="setIsShowSearch(false)"
  />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import navbarStore from '@/core/store/app/app-navbar'

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
