import {MutationTree} from 'vuex'
import {RouteConfig} from 'vue-router'
import {routes} from '@/app/routes/routes'
import {IRoute} from '@/core/models/interfaces/app/IRoute'
import {IAppBarState} from '@/core/store/types'

export const mutations: MutationTree<IAppBarState> = {
    setSearchText(state, val: string) {
        state.searchText = val
    },
    setIsShowDrawer(state, val:boolean) {
        state.isShowDrawer = val
    },
    setAvatar(state, val: string) {
        state.avatar = val
    },
    setIsShowSearch(state, val: boolean) {
        state.isShowSearch = val
    },
    setNoteTab(state, props: { $route: RouteConfig; $forceUpdate: () => void }):void {
        const route = routes.find((r: IRoute) => props.$route.path.includes(r.path) && r.group) as IRoute

        if (route && route.group) {
            // state.noteRoute = route
            state.activeClass = 'active-btn'
        } else {
            // state.noteRoute = routesObj.NOTES
            state.activeClass = ''
        }

        props.$forceUpdate()
    },
}

