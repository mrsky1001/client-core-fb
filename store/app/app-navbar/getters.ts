import { IAppBarState, RootState } from '@/core/store/types'
import authStore from '@/core/store/auth/auth.store'
import { GetterTree } from 'vuex'
import routerStore from '@/core/store/app/router.store'

export const getters: GetterTree<IAppBarState, RootState> = {
    avatarRoutes() {
        return routerStore.getters.getAvatarRoutes
    },
    getAvatarClass() {
        return authStore.state.user.isAuthorized ? 'active-btn' : ''
    },
}
