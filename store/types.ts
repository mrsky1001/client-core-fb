import { IRoute } from '@/core/models/interfaces/app/IRoute'

export interface RootState {
    version: string
}

export interface IAppBarStore {
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
