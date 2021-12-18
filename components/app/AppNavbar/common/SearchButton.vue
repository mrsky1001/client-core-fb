<!--
  - Copyright (©) 13.10.2021, 14:47. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-btn
        plain
        color="gray"
        class="search-btn font-weight-bold"
        active-class="active-btn"
        @click="setIsShowSearch(true)"
    >
        <v-icon>mdi-magnify-scan</v-icon>
    </v-btn>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import navbarStore from '@/core/store/app/app-navbar'
import { mapMutations } from 'vuex'

@Component({
    store: navbarStore,
    methods: {
        ...mapMutations(['setIsShowSearch']),
    },
})
export default class SearchButton extends Vue {}
</script>

<style lang="scss" scoped>
.search-btn {
    margin-right: 16px !important;
    min-width: 15px !important;
    max-width: 25px;
}

@media screen and (min-width: 0px) and (max-width: 959px) {
    .search-btn {
        display: block;
        margin-right: auto !important;
    }
}
</style>
