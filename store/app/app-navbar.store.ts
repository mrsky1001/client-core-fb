import { createModule, mutation, action, getter, Module, createProxy } from 'vuex-class-component'
import authStore from '@/core/store/auth/auth.store'

const VuexModule = createModule({
    namespaced: 'appNavbar',
    strict: false,
})

export class AppNavbarStore extends VuexModule {
    public searchText = ''
    public avatar = ''
    public isShowSearch = false
    public isShowDrawer = false

    get avatarClass() {
        return authStore.state.user.isAuthorized ? 'active-btn' : ''
    }

    // setNoteTab(state, props: { $route: RouteConfig; $forceUpdate: () => void }):void {
    //   const route = routes.find((r: IRoute) => props.$route.path.includes(r.path) && r.group) as IRoute
    //
    //   if (route && route.group) {
    //     state.noteRoute = route
    // state.activeClass = 'active-btn'
    // } else {
    //   state.noteRoute = routesObj.NOTES
    // state.activeClass = ''
    // }
    //
    // props.$forceUpdate()
    // },
}
export default AppNavbarStore
