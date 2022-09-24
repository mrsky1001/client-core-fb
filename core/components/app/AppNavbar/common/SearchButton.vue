<!--
  - Copyright (©) 13.10.2021, 14:47. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-btn plain color="gray" :class="classes" active-class="active-btn" @click="nav.setIsShowSearch(true)">
        <v-icon>mdi-magnify-scan</v-icon>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxc } from '@/core/store/store.vuex'

@Component
export default class SearchButton extends Vue {
    nav = vxc.appNavbar

    get classes() {
        let classes = 'search-btn font-weight-bold '

        if (this.nav.searchText.length) {
            classes += ' search-btn__active'
        }

        return classes
    }
}
</script>

<style lang="scss">
.search-btn {
    margin-right: 16px !important;
    min-width: 15px !important;
    max-width: 25px;
}

.search-btn__active > * {
    opacity: 1 !important;
    color: #1a9dfd !important;
}

@media screen and (min-width: 0px) and (max-width: 959px) {
    .search-btn {
        display: block;
        margin-right: 0 !important;
        //margin-left: 12px !important;
        //margin-right: auto !important;
    }
}
</style>
