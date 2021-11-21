/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import { RouteConfig } from 'vue-router'
import { routes } from '@/app/router/routes/routes'
import { authStore, routerStore } from '@/app/store/index.store'
import { IRoute } from '@/core/models/interfaces/app/IRoute'
Vue.use(Vuex)

interface IAppBarStore {
    routes: IRoute[]
    searchText: string
    isShowDrawer: boolean
    isShowSearch: boolean
    activeClass: string
    isErrAva: boolean
    avatar: string
    centerRoutes: IRoute[]
    noteRoute: IRoute
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const appNavbarClassStore = (routesObj: any): Store<any> =>
    new Vuex.Store<IAppBarStore>({
        state: {
            routes: routes,
            searchText: '',
            isShowDrawer: false,
            isShowSearch: false,
            activeClass: '',
            isErrAva: false,
            avatar: authStore.state.user.avatar,
            centerRoutes: routerStore.getters.getCenterRoutes,
            noteRoute: routesObj.NOTES,
        },
        getters: {
            avatarRoutes() {
                return routerStore.getters.getAvatarRoutes
            },
            getAvatarClass() {
                return authStore.state.user.isAuthorized ? 'active-btn' : ''
            },
        },
        mutations: {
            setSearchText(state, val) {
                state.searchText = val
            },
            setIsShowDrawer(state, val) {
                state.isShowDrawer = val
            },
            setAvatar(state, val) {
                state.isErrAva = false
                state.avatar = val
            },
            setIsShowSearch(state, val) {
                state.isShowSearch = val
            },
            setIsErrAva(state, err) {
                state.isErrAva = !!err
            },
            setNoteTab(state, props: { $route: RouteConfig; $forceUpdate: () => void }) {
                const route = routes.find((r: IRoute) => props.$route.path.includes(r.path) && r.group) as IRoute

                if (route && route.group) {
                    state.noteRoute = route
                    state.activeClass = 'active-btn'
                } else {
                    state.noteRoute = routesObj.NOTES
                    state.activeClass = ''
                }

                props.$forceUpdate()
            },
        },

        actions: {},
    })
export default appNavbarClassStore
