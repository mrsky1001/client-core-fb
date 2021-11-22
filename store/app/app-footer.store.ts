/*
 * Copyright (c) 21.11.2021, 21:49  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex from 'vuex'
import Vue from 'vue'
import config from '../../../../config/config'
import { routes } from '@/app/router/routes/routes'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        routes: routes,
        footerImg: '',
    },
    mutations: {
        resetFooterImg(state) {
            const listFooterImg = [
                'berries',
                'car',
                'code',
                'fish',
                'flowers',
                'garage',
                'guitar',
                'kitchen',
                'sewing',
                'town',
                'watch',
            ]
            const length = listFooterImg.length - 1
            const num = Math.floor(Math.random() * length)

            state.footerImg = `${config.paths.footerImgs}${listFooterImg[num]}.png`
        },
    },
})
