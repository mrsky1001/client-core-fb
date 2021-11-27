<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div>
        <v-app-bar app color="white" class="my-app-bar" light scroll-target="#scrolling-techniques-2">
            <v-app-bar-nav-icon
                v-if="!isShowSearch"
                @click="setIsShowDrawer(true)"
                class="d-flex d-md-none"
            ></v-app-bar-nav-icon>
            <LogoBar></LogoBar>
            <NavDrawer></NavDrawer>
            <SearchField class="search-field"></SearchField>
            <SearchButton></SearchButton>
            <AvatarBar></AvatarBar>
        </v-app-bar>
        <SideDrawer></SideDrawer>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import navbarStore from '@/core/store/app/app-navbar.store'
import SideDrawer from './SideDrawer/SideDrawer'
import NavDrawer from './NavDrawer/NavDrawer'

import { mapMutations, mapState } from 'vuex'
import AvatarBar from './common/AvatarBar'
import LogoBar from '@/core/components/app/AppNavbar/common/LogoBar'
import SearchButton from '@/core/components/app/AppNavbar/common/SearchButton'
import SearchField from '@/core/components/app/AppNavbar/common/SearchField'

@Component({
    store: navbarStore,
    components: {
        SearchField,
        SearchButton,
        LogoBar,
        AvatarBar,
        NavDrawer,
        SideDrawer,
    },
    computed: {
        ...mapState(['routes', 'isShowDrawer', 'searchText', 'isShowSearch']),
    },
    methods: {
        ...mapMutations(['setIsShowDrawer', 'setSearchText', 'setIsShowSearch']),
    },
})
export default class AppNavbar extends Vue {}
</script>

<style lang="scss">
.my-app-bar {
    box-shadow: rgba(0, 0, 0, 0.08) 0 8px 16px !important;

    .search-field {
        background-color: white;
        min-width: 400px;
        max-width: 400px;
        width: 400px;
    }

    .my-row-bar {
        margin: 0 !important;

        .v-btn {
            margin-right: 30px;
            padding: 0 !important;

            &:last-child {
                margin-right: 16px;
            }

            color: #3e3e3e;

            .my-label {
                font-size: 1.17em;
                margin-block-start: 1em;
                margin-block-end: 1em;
                margin-inline-start: 0;
                margin-inline-end: 0;
                font-weight: bold;
            }

            .v-icon {
                margin-top: -4px;
                margin-right: 3px;
            }
        }

        .active-btn {
            .v-icon {
                margin-top: 4px;
                font-size: 28px;
            }

            > span {
                opacity: 1 !important;
            }

            .my-label {
                border-bottom: 0.2rem solid #3e3e3e;
            }
        }
    }
}

@media screen and (min-width: 0px) and (max-width: 959px) {
    .my-app-bar {
        .search-field {
            display: none;
        }
    }
}
</style>
