/*
 * Copyright (c) 21.11.2021, 21:37  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import { login } from '@/core/services/auth.services'
import reCaptchaLib from '@/core/lib/reCaptcha.lib'
import { action, createModule, mutation } from 'vuex-class-component'
import { vxc } from '@/core/store/store.vuex'

const VuexModule = createModule({
    namespaced: 'login',
    strict: false,
})

export class LoginStore extends VuexModule {
    login = ''
    password = ''
    prevRoute = ''
    isShowPassword = false
    validRules = { required: true }

    @mutation setLogin(val: string) {
        this.login = val
    }

    @mutation setPassword(val: string) {
        this.password = val
    }

    @mutation setPrevRoute(val: string) {
        this.prevRoute = val
    }

    @mutation setIsShowPassword(val: boolean) {
        this.isShowPassword = val
    }

    @action
    async loginAccount() {
        if (vxc.auth.isCaptchaVerify) {
            return login({
                login: this.login,
                password: this.password,
                responseKey: vxc.auth.responseKey,
            })
        } else {
            reCaptchaLib.errorEvent()
        }
    }
}

export default LoginStore
