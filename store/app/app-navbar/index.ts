/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Module } from 'vuex'
import Vue from 'vue'
import { routes } from '@/app/routes/routes'
import { IAppBarState, RootState } from '@/core/store/types'
import { getters } from '@/core/store/app/app-navbar/getters'
import { mutations } from '@/core/store/app/app-navbar/mutations'

Vue.use(Vuex)


export const state: IAppBarState = {
    routes: routes,
    searchText: '',
    activeClass: '',
    avatar: '',
    // noteRoute: '',
    isShowDrawer: false,
    isShowSearch: false,
}

const namespaced = true

export const navbar: Module<IAppBarState, RootState> = {
    namespaced,
    state,
    getters,
    mutations
}
