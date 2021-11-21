/*
 * Copyright (c) 21.11.2021, 21:37  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import ServiceStorage from '@/core/lib/service-storage'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAgreeCookie: ServiceStorage.getProp('isAgreeCookie'),
    },
    mutations: {
        setAgreeCookie(state) {
            ServiceStorage.setProp('isAgreeCookie', true)
            state.isAgreeCookie = ServiceStorage.getProp('isAgreeCookie')
        },
    },
})
