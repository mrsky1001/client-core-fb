/*
 * Copyright (c) 21.11.2021, 21:49  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const appClassStore = (): Store<any> =>
    new Vuex.Store({
        state: {},
        mutations: {},
        actions: {},
        modules: {},
    })
export default appClassStore
