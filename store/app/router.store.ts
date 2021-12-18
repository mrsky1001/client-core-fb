/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import roles from '@/core/collections/roles'
import { IRoute } from '@/core/models/interfaces/app/IRoute'
import { routes } from '@/app/routes/routes'

import { createModule, getter } from 'vuex-class-component'
import { vxc } from '@/core/store/store.vuex'

const VuexModule = createModule({
    namespaced: 'router',
    strict: false,
})

export class RouterStore extends VuexModule {
    @getter getSubRoutes(route: IRoute) {
        return routes.filter((r: IRoute) => route.name === r.group && vxc.auth.checkRole(r.role))
    }

    @getter getAvatarRoutes() {
        if (vxc.auth.user.isAuthorized) {
            return routes.filter((r) => r.onAvatarBar && r.role !== roles.UNAUTHORIZED && vxc.auth.checkRole(r.role))
        } else {
            return routes.filter((r) => r.onAvatarBar && r.role === roles.UNAUTHORIZED)
        }
    }

    @getter getCenterRoutes() {
        return routes.filter((r) => r.onCenterSidebar && vxc.auth.checkRole(r.role))
    }
}

export default RouterStore
