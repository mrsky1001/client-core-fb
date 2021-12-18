/*
 * Copyright (c) 21.11.2021, 21:20  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import { registration } from '@/core/services/auth.services'
import reCaptchaLib from '@/core/lib/reCaptcha.lib'
import { vxc } from '@/core/store/store.vuex'
import { action, createModule, mutation } from 'vuex-class-component'

const VuexModule = createModule({
    namespaced: 'registration',
    strict: false,
})

export class RegistrationStore extends VuexModule {
    email = ''
    username = ''
    password = ''
    isShowPassword = false

    validUsernameRules = { required: true, min: 3, max: 10, regex: /(?![.\n])((?=.*[a-z])|(?=.*[A-Z])).*$/ }
    validPasswordRules = {
        required: true,
        min: 8,
        max: 20,
        regex: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/,
    }
    validAvatarRules = { required: true }
    validEmailRules = { required: true, email: true }

    @mutation setUsername(val: string) {
        this.username = val
    }

    @mutation setEmail(val: string) {
        this.email = val
    }

    @mutation setPassword(val: string) {
        this.password = val
    }

    @mutation setIsShowPassword(val: boolean) {
        this.isShowPassword = val
    }

    @action
    async regAccount() {
        if (vxc.auth.isCaptchaVerify) {
            return registration({
                username: this.username,
                email: this.email,
                password: this.password,
                responseKey: vxc.auth.responseKey,
            })
        } else {
            reCaptchaLib.errorEvent()
        }
    }
}

export default RegistrationStore
