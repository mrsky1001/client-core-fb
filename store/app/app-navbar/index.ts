/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex from 'vuex'
import Vue from 'vue'
import { routes } from '@/app/routes/routes'
import authStore from '@/core/store/auth/auth.store'
import routerStore from '@/core/store/app/router.store'
import routesObj from '@/app/routes/routes-obj'
import { IAppBarStore } from '@/core/store/types'

Vue.use(Vuex)

const index = new Vuex.Store<IAppBarStore>({
    state: {
        routes: routes,
        searchText: '',
        isShowDrawer: false,
        isShowSearch: false,
        activeClass: '',
        isErrAva: false,
        avatar: authStore.state.user.avatar,
        centerRoutes: routerStore.getters.getCenterRoutes,
        noteRoute: routesObj.NOTES,
    },
    getters: {
        avatarRoutes() {
            return routerStore.getters.getAvatarRoutes
        },
        getAvatarClass() {
            return authStore.state.user.isAuthorized ? 'active-btn' : ''
        },
    },
    mutations: {},

    actions: {},
})

export default index
