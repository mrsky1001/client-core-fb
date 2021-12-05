/*
 * Copyright (c) 21.11.2021, 21:20  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex from 'vuex'
import Vue from 'vue'
import { deleteAccount, getUser, logout, saveAccount } from '@/core/services/auth.services'
import { deleteAvatarImage, uploadAvatarImage } from '@/core/services/img.services'
import reCaptchaLib from '@/core/lib/reCaptcha.lib'
import { getTimeSalt } from '@/core/lib/tools.lib'
import authStore from '@/core/store/auth/auth.store'
import routesObj from '@/app/routes/routes-obj'

Vue.use(Vuex)

const accountStore = new Vuex.Store({
    state: {
        email: '',
        avatar: '',
        username: '',
        password: '',
        avatarBlob: '',
        isLoaded: false,
        isShowPassword: false,
        isShowAvaMenuModal: false,
        isShowAvaUploadModal: false,
        delRoute: routesObj.DELETE_ACCOUNT.path,
        validUsernameRules: { required: true, min: 3, max: 10, regex: /(?![.\n])((?=.*[a-z])|(?=.*[A-Z])).*$/ },
        validPasswordRules: { min: 8, max: 20, regex: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/ },
        validAvatarRules: {},
        validEmailRules: { required: true, email: true },
    },
    mutations: {
        setUsername(state, val) {
            state.username = val.target.value
        },
        setEmail(state, val) {
            state.email = val
        },
        setPassword(state, val) {
            state.password = val
        },
        setAvatar(state, val) {
            state.avatar = val + getTimeSalt()
        },
        setIsShowAvaMenuModal(state, val) {
            state.isShowAvaMenuModal = val
        },
        setIsShowUploadModal(state, val) {
            state.isShowAvaUploadModal = val
        },
        saveAvatar(state, val) {
            state.isLoaded = false
            state.avatar = URL.createObjectURL(val.croppedFile)
            state.avatarBlob = val.croppedFile
        },
        setIsShowPassword(state, val) {
            state.isShowPassword = val
        },
        onVerify: (sate, val) => authStore.commit('onVerify', val),
        onExpired: (sate, val) => authStore.commit('onExpired', val),
        setRefRecaptcha: (sate, val) => authStore.commit('setRefRecaptcha', val),
    },
    actions: {
        getAccountData(ctx) {
            ctx.state.password = ''

            getUser().then((user) => {
                ctx.state.username = user.username
                ctx.state.avatar = user.avatar
                ctx.state.email = user.email
                ctx.state.isLoaded = true
            })

            authStore.commit('reset')
        },
        saveAccount(ctx) {
            if (authStore.state.isCaptchaVerify) {
                if (ctx.state.avatarBlob) {
                    uploadAvatarImage(ctx.state.avatarBlob, ctx.state.username)
                        .then((imgUrl) => {
                            saveAccount({
                                username: ctx.state.username,
                                email: ctx.state.email,
                                password: ctx.state.password ?? undefined,
                                responseKey: authStore.state.responseKey,
                                avatar: imgUrl,
                            })
                                .then(() => {
                                    ctx.state.avatar = imgUrl + getTimeSalt()
                                    ctx.state.isLoaded = true
                                })
                                .catch(() => authStore.dispatch('resetRecaptcha'))
                        })
                        .catch(() => authStore.dispatch('resetRecaptcha'))
                } else {
                    saveAccount({
                        username: ctx.state.username,
                        email: ctx.state.email,
                        password: ctx.state.password ?? undefined,
                        responseKey: authStore.state.responseKey,
                    })
                        .then(() => {
                            ctx.state.isLoaded = true
                        })
                        .catch(() => ctx.dispatch('resetRecaptcha'))
                }
            } else {
                reCaptchaLib.errorEvent()
            }
        },
        deleteAvatar(ctx) {
            deleteAvatarImage().then(() => {
                ctx.state.avatar = ''
                ctx.state.avatarBlob = ''
                ctx.state.isShowAvaMenuModal = false
                ctx.state.isLoaded = false
            })
        },
        logout: () => logout(),
        deleteAccount: () => deleteAccount(),
        resetRecaptcha: () => authStore.dispatch('resetRecaptcha'),
    },
    modules: {},
})

export default accountStore
