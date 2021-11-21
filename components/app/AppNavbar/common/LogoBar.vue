<!--
  - Copyright (©) 12.10.2021, 12:40. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-toolbar-title class="logo-bar">
        <router-link to="/" class="logo-link">
            <v-img :src="logo" :class="'logo-img ' + (isShowSearch ? 'left-logo' : '')"></v-img>
        </router-link>
        <SearchField class="search-field-small"></SearchField>
    </v-toolbar-title>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import logo from '@/core/assets/fb15.svg'
import navbarStore from '@/core/store/app/app-navbar.store'
import SubRoutes from '@/core/components/app/AppNavbar/NavDrawer/SubRoutes'
import { mapMutations, mapState } from 'vuex'
import SearchField from '@/core/components/app/AppNavbar/common/SearchField'

@Component({
    store: navbarStore,
    components: {
        SearchField,
        SubRoutes,
    },
    computed: {
        ...mapState(['routes', 'isShowDrawer', 'searchText', 'isShowSearch']),
    },
    methods: {
        ...mapMutations(['setIsShowDrawer', 'setSearchText', 'setIsShowSearch']),
    },
})
export default class AppNavbar extends Vue {
    logo = logo
}
</script>

<style lang="scss" scoped>
.search-field-small {
    display: none;
}

.logo-bar {
    padding-left: 0 !important;
    margin-left: 2%;

    .logo-img {
        border: 0;
        height: auto;
        width: 150px;
        max-width: 100%;
        margin: 10px 0 0 1%;
        -ms-interpolation-mode: nearest-neighbor;

        .v-image__image--cover {
            background-size: unset !important;
        }
    }
}

@media screen and (min-width: 0px) and (max-width: 959px) {
    .search-field-small {
        display: block;
        float: right;
        width: 100%;
        padding-left: 80px;
        background-color: white;
    }

    .v-toolbar__title {
        width: 100%;
    }

    .logo-img {
        display: block;
        margin: auto !important;
        position: absolute;
        top: 6px;
        left: 0;
        bottom: -8px;
        right: 0;
        transform: scale(0.9);
    }

    .left-logo {
        //opacity: 0.8;
        transform: scale(0.8);
        margin-left: -20px !important;
    }
}

//@media screen and (min-width: 959px) and (max-width: 1750px) {
//  .logo-img {
//    display: block;
//    margin-left: -20px !important;
//  }
//
//  .left-logo {
//    margin-right: 20px !important;
//    margin-left: 0 !important;
//  }
//}
</style>
