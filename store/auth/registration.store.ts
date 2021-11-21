/*
 * Copyright (c) 21.11.2021, 21:20  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import { registration } from '@/app/services/auth.services'
import reCaptchaLib from '@/app/common/reCaptcha.lib'
import { authStore } from '@/app/store/index.store'
Vue.use(Vuex)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const regClassStore = (routesObj: any): Store<any> =>
    new Vuex.Store({
        state: {
            email: '',
            username: '',
            password: '',
            isShowPassword: false,

            loginRoute: routesObj.LOGIN.path,
            validUsernameRules: { required: true, min: 3, max: 10, regex: /(?![.\n])((?=.*[a-z])|(?=.*[A-Z])).*$/ },
            validPasswordRules: {
                required: true,
                min: 8,
                max: 20,
                regex: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/,
            },
            validAvatarRules: { required: true },
            validEmailRules: { required: true, email: true },
        },
        mutations: {
            setUsername(state, val) {
                state.username = val
            },
            setEmail(state, val) {
                state.email = val
            },
            setPassword(state, val) {
                state.password = val
            },

            setIsShowPassword(state, val) {
                state.isShowPassword = val
            },
            onVerify: (sate, val) => authStore.commit('onVerify', val),
            onExpired: (sate, val) => authStore.commit('onExpired', val),
            setRefRecaptcha: (sate, val) => authStore.commit('setRefRecaptcha', val),
        },
        actions: {
            regAccount(ctx) {
                if (authStore.state.isCaptchaVerify) {
                    return registration({
                        username: ctx.state.username,
                        email: ctx.state.email,
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

export default regClassStore
