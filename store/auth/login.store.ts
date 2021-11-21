/*
 * Copyright (c) 21.11.2021, 21:37  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import { login } from '@/core/services/auth.services'
import reCaptchaLib from '@/app/common/reCaptcha.lib'
import { authStore } from '@/app/store/index.store'
Vue.use(Vuex)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const loginClassStore = (routesObj: any): Store<any> =>
    new Vuex.Store({
        state: {
            login: '',
            password: '',
            prevRoute: '',
            isShowPassword: false,
            regRoute: routesObj.REGISTRATION.path,
            validRules: { required: true },
        },
        mutations: {
            setLogin(state, val) {
                state.login = val
            },
            setPassword(state, val) {
                state.password = val
            },
            setPrevRoute(state, val) {
                state.prevRoute = val
            },
            setIsShowPassword(state, val) {
                state.isShowPassword = val
            },
            onVerify: (sate, val) => authStore.commit('onVerify', val),
            onExpired: (sate, val) => authStore.commit('onExpired', val),
            setRefRecaptcha: (sate, val) => authStore.commit('setRefRecaptcha', val),
        },
        actions: {
            loginAccount(ctx) {
                if (authStore.state.isCaptchaVerify) {
                    return login({
                        login: ctx.state.login,
                        password: ctx.state.password,
                        responseKey: authStore.state.responseKey,
                    })
                } else {
                    reCaptchaLib.errorEvent()
                }
            },
            resetRecaptcha: () => authStore.dispatch('resetRecaptcha'),
        },
        modules: {},
    })

export default loginClassStore
