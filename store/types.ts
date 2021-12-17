import {IRoute} from '@/core/models/interfaces/app/IRoute'

export interface RootState {
    version: string
}

export interface IAppBarState {
    routes: IRoute[]
    searchText: string
    isShowDrawer: boolean
    isShowSearch: boolean
    activeClass: string
}
