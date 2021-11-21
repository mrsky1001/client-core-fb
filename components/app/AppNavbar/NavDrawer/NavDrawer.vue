<!--
  - Copyright (©) 15.10.2021, 15:56. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-row justify="end" class="d-none d-md-flex my-row-bar">
        <template v-for="route in routes">
            <v-btn
                v-show="!isShowSearch"
                :key="route.name"
                v-if="route.onMainBar"
                :to="route.path"
                plain
                active-class="active-btn"
            >
                <v-icon v-if="route.hasIcon">{{ route.icon }}</v-icon>
                <p class="my-label">{{ route.text }}</p>
            </v-btn>
            <SubRoutes v-if="route.isGroup" :key="route.name" :route="route"></SubRoutes>
        </template>
    </v-row>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import navbarStore from '@/core/store/app/app-navbar.store'
import SubRoutes from './SubRoutes'
import { mapMutations, mapState } from 'vuex'

@Component({
    store: navbarStore,
    components: {
        SubRoutes,
    },
    computed: {
        ...mapState(['routes', 'isShowDrawer', 'searchText', 'isShowSearch']),
    },
    methods: {
        ...mapMutations(['setIsShowDrawer', 'setSearchText', 'setIsShowSearch']),
    },
})
export default class NavDrawer extends Vue {}
</script>

<style lang="scss" scoped></style>
