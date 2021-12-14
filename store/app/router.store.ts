/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex from 'vuex'
import Vue from 'vue'
import roles from '@/core/collections/roles'
import authStore from '@/core/store/auth/auth.store'
import { IRoute } from '@/core/models/interfaces/app/IRoute'
import { routes } from '@/app/routes/routes'

Vue.use(Vuex)

const routerStore = new Vuex.Store({
    getters: {
        getSubRoutes: () => (route: IRoute) => {
            return routes.filter((r: IRoute) => route.name === r.group && authStore.getters.checkRole(r.role))
        },
        getAvatarRoutes() {
            console.log(authStore.state.user)
            if (authStore.state.user.isAuthorized) {
                return routes.filter(
                    (r) => r.onAvatarBar && r.role !== roles.UNAUTHORIZED && authStore.getters.checkRole(r.role)
                )
            } else {
                return routes.filter((r) => r.onAvatarBar && r.role === roles.UNAUTHORIZED)
            }
        },
        getCenterRoutes() {
            return routes.filter((r) => r.onCenterSidebar && authStore.getters.checkRole(r.role))
        },
    },
    actions: {},
})

export default routerStore
