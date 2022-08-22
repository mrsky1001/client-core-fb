/*
 * Copyright (c)  Kolyada Nikita Vladimirovich <nikita.nk16@yandex.ru> 10.10.2021, 15:26
 */

// const checkAuth = (to, from, next, role = roles.USER) => {
//   User.checkRole(role) && services.isAuthorized() ? next() : next(routesObj.LOGIN)
// }

import Store from '@/app/views/Store.vue'
import Login from '@/core/components/auth/Login/Login.vue'
import Logout from '@/core/components/auth/Logout/Logout.vue'
import Registration from '@/core/components/auth/Registration/Registration.vue'
import Account from '@/core/components/auth/Account/Account.vue'
import DeleteAccount from '@/core/components/auth/DeleteAccount/DeleteAccount.vue'
import routesObj from '@/app/routes/routes-obj'
import { IRoute } from '@/core/models/interfaces/app/IRoute'
import PostPage from '@/app/views/Post/PostPage.vue'
import Home from '@/app/views/Home/Home.vue'
import EditPostPage from '@/app/views/EditPost/EditPost.vue'
import Conditions from '@/core/components/docs/conditions/Conditions.vue'
import Disclaimer from '@/core/components/docs/disclaimer/Disclaimer.vue'
import CopyrightHolders from '@/core/components/docs/copyrightHolders/CopyrightHolders.vue'
import Agreement from '@/core/components/docs/agreement/Agreement.vue'

const routesComponents = {
    STORE: Object.assign(routesObj.STORE, { component: Store }),
    HOME: Object.assign(routesObj.HOME, { component: Home }),
    SECTION: Object.assign(routesObj.SECTION, { component: Home }),
    SEARCH: Object.assign(routesObj.SEARCH, { component: Home }),
    // DEV: Object.assign(routesObj.DEV, { component: Home }),
    DESIGN: Object.assign(routesObj.DESIGN, { component: Store }),
    ABOUT: Object.assign(routesObj.ABOUT, { component: PostPage }),
    CONDITIONS: Object.assign(routesObj.CONDITIONS, { component: Conditions }),
    DISCLAIMER: Object.assign(routesObj.DISCLAIMER, { component: Disclaimer }),
    COPYRIGHT_HOLDERS: Object.assign(routesObj.COPYRIGHT_HOLDERS, { component: CopyrightHolders }),
    AGREEMENT: Object.assign(routesObj.AGREEMENT, { component: Agreement }),

    // NOTES: routesObj.NOTES,
    // PHOTO: Object.assign(routesObj.PHOTO, { component: Store }),
    // TRIP: Object.assign(routesObj.TRIP, { component: Store }),
    // YOUTUBE: Object.assign(routesObj.YOUTUBE, { component: Store }),
    // FLOWER: Object.assign(routesObj.FLOWER, { component: Store }),
    // ART: Object.assign(routesObj.ART, { component: Store }),
    // EMBROIDERY: Object.assign(routesObj.EMBROIDERY, { component: Store }),
    // GADGETS: Object.assign(routesObj.GADGETS, { component: Store }),

    POST: Object.assign(routesObj.POST, { component: PostPage }),
    POST_BY_ID: Object.assign(routesObj.POST_BY_ID, { component: PostPage }),
    NEW_POST: Object.assign(routesObj.NEW_POST, { component: EditPostPage }),
    EDIT_POST: Object.assign(routesObj.EDIT_POST, { component: EditPostPage }),

    LOGIN: Object.assign(routesObj.LOGIN, { component: Login }),
    ACCOUNT: Object.assign(routesObj.ACCOUNT, { component: Account }),
    REGISTRATION: Object.assign(routesObj.REGISTRATION, { component: Registration }),
    LOGOUT: Object.assign(routesObj.LOGOUT, { component: Logout }),
    DELETE_ACCOUNT: Object.assign(routesObj.DELETE_ACCOUNT, { component: DeleteAccount }),

    ALL: routesObj.ALL,
}

export const routes: Array<IRoute> = Object.values(routesComponents)
