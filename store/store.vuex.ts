/*
 * Copyright (c) 17.12.2021, 22:22  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import AppNavbarStore from '@/core/store/app/app-navbar.store'
import AuthStore from '@/core/store/auth/auth.store'
import RouterStore from '@/core/store/app/router.store'
import RegistrationStore from '@/core/store/auth/registration.store'
import LoginStore from '@/core/store/auth/login.store'
import CookieStore from '@/core/store/auth/cookie.store'
import AccountStore from '@/core/store/auth/account.store'
import SnackbarStore from '@/core/store/app/snackbar.store'
import AppFooterStore from '@/core/store/app/app-footer.store'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        ...extractVuexModule(AppNavbarStore),
        ...extractVuexModule(AuthStore),
        ...extractVuexModule(RouterStore),
        ...extractVuexModule(RegistrationStore),
        ...extractVuexModule(LoginStore),
        ...extractVuexModule(CookieStore),
        ...extractVuexModule(AccountStore),
    },
})

export const vxc = {
    appNavbar: createProxy(store, AppNavbarStore),
    auth: createProxy(store, AuthStore),
    router: createProxy(store, RouterStore),
    registration: createProxy(store, RegistrationStore),
    login: createProxy(store, LoginStore),
    cookie: createProxy(store, CookieStore),
    account: createProxy(store, AccountStore),
    snackbar: createProxy(store, SnackbarStore),
    appFooter: createProxy(store, AppFooterStore),
}
