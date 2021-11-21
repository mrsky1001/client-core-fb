/*
 * Copyright (c) 21.11.2021, 21:37  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import ServiceStorage from '@/app/common/service-storage'
Vue.use(Vuex)

const cookieClassStore = (): Store<any> =>
    new Vuex.Store({
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
export default cookieClassStore
