import {IAppBarState, RootState} from '@/core/store/types'
import authStore from '@/core/store/auth/auth.store'
import {GetterTree} from 'vuex'

export const getters: GetterTree<IAppBarState, RootState> = {
    getAvatarClass() {
        return authStore.state.user.isAuthorized ? 'active-btn' : ''
    },
}
