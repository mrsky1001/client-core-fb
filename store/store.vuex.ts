/*
 * Copyright (c) 17.12.2021, 22:22  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import AppNavbarStore from '@/core/store/app/app-navbar.store'
Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        ...extractVuexModule(AppNavbarStore),
    },
})

export const vxm = {
    appNavbar: createProxy(store, AppNavbarStore),
}
