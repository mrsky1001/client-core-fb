/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import { IRoute } from '@/app/router/routes/routes-obj'
import roles from '@/app/common/roles'
import { authStore } from '@/app/store/index.store'
Vue.use(Vuex)

const routerClassStore = (routes: IRoute[]): Store<any> =>
    new Vuex.Store({
        getters: {
            getSubRoutes: () => (route: IRoute) => {
                return routes.filter((r: IRoute) => route.name === r.group && authStore.getters.checkRole(r.role))
            },
            getAvatarRoutes() {
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

export default routerClassStore
