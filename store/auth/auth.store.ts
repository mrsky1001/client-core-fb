/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import ServiceStorage from '@/app/common/service-storage'
import roles from '@/app/common/roles'
import { IUser } from '@/core/models/interfaces/auth/IUser'
import User from '@/core/models/classes/auth/User'
import { navbarStore } from '@/app/store/index.store'
import { IRole } from '@/core/models/interfaces/auth/IRole'

Vue.use(Vuex)

const authClassStore = (): Store<any> =>
    new Vuex.Store({
        state: {
            responseKey: '',
            isCaptchaVerify: false,
            refRecaptcha: { reset: () => null },
            user: new User(ServiceStorage.getProp('user')),
        },
        mutations: {
            setResponseKey(state, val) {
                state.responseKey = val
            },
            setRefRecaptcha(state, val) {
                state.refRecaptcha = val
            },
            saveUser(state, rawUser: IUser): void {
                const user = new User(rawUser)
                ServiceStorage.setProp('user', user)
                navbarStore.commit('setAvatar', user.avatar)
                state.user = user
            },
            onVerify(state, val) {
                state.responseKey = val
                state.isCaptchaVerify = true
            },
            onExpired(state) {
                state.isCaptchaVerify = false
            },
            reset(state) {
                state.responseKey = 'false'
                state.isCaptchaVerify = false
            },
        },
        getters: {
            checkRole(state) {
                return (role: IRole, justOne = false): boolean => {
                    const user = state.user
                    role = role ? role : roles.UNAUTHORIZED

                    if (user.isAuthorized) {
                        if (justOne) {
                            return user.role === role.value
                        } else {
                            return user.role <= role.value
                        }
                    }

                    return role.value === roles.UNAUTHORIZED.value
                }
            },
        },
        actions: {
            resetRecaptcha(ctx) {
                ctx.state.responseKey && ctx.state.refRecaptcha && ctx.state.refRecaptcha.reset()
                ctx.state.responseKey = ''
            },
        },
    })
export default authClassStore
