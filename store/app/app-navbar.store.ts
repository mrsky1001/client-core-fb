import { createModule, mutation } from 'vuex-class-component'
import { vxc } from '@/core/store/store.vuex'

const VuexModule = createModule({
    namespaced: 'appNavbar',
    strict: false,
})

export class AppNavbarStore extends VuexModule {
    searchText = ''
    noteRoute = ''
    activeClass = ''
    avatar = ''
    isShowSearch = false
    isShowDrawer = false
    callSearch = (_: string) => ''

    get avatarClass() {
        return vxc.auth.user.isAuthorized ? 'active-btn' : ''
    }

    @mutation
    setCallSearch(val: (_: string) => string) {
        this.callSearch = val
    }

    @mutation
    setIsShowSearch(val: boolean) {
        this.isShowSearch = val
    }
    @mutation
    setIsShowDrawer(val: boolean) {
        this.isShowDrawer = val
    }

    @mutation
    setAvatar(val: string) {
        this.avatar = val
    }

    @mutation
    setSearchText(val: string) {
        this.searchText = val
    }
}

export default AppNavbarStore
