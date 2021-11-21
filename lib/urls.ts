/*
 * Copyright (©) 21.10.2021, 11:51. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

export default {
    LOGIN: '/api/login',
    ROLES: '/api/roles',
    REGISTRATION: '/api/registration',
    LOGOUT: '/api/logout',
    IS_AUTHORIZED: '/api/is-authorized',
    GET_USER: '/api/user',
    UPDATE_USER: '/api/user',
    DELETE_USER: '/api/user',

    GET_USERS: '/api/users',
    CREATE_USER: '/api/user',
    GET_USER_BY_ID: '/api/user/:userId',
    UPDATE_USER_BY_ID: '/api/user/:userId',
    DELETE_USER_BY_ID: '/api/user/:userId',

    SEARCH: '/api/search/:search',

    GET_ALL_POSTS: '/api/posts',
    GET_POST_BY_ID: '/api/post/id/:postId',
    GET_ALL_POSTS_BY_SECTION: '/api/posts/:section',
    GET_POST_BY_TITLE: '/api/post/:title',
    CREATE_POST: '/api/post',
    UPDATE_POST_BY_ID: '/api/post/:postId',

    GET_ALL_PRODUCTS: '/api/product',
    GET_PRODUCT_BY_ID: '/api/product/id/:postId',
    GET_PRODUCT_BY_TITLE: '/api/product/:title',
    CREATE_PRODUCT: '/api/product',
    UPDATE_PRODUCT_BY_ID: '/api/product/:productId',

    UPDATE_LIKE: '/api/like',
    UPDATE_STATUS_POST: '/api/status',

    GET_IMG: '/api/uploads/images/',
    GET_IMG_OLD: '/uploads/images',

    UPLOAD_PRODUCT_IMG: '/api/product/img',
    DELETE_PRODUCT_IMG: '/api/product/img',

    UPLOAD_POST_IMG: '/api/post/img',
    DELETE_POST_IMG: '/api/post/img',

    UPLOAD_AVATAR_IMG: '/api/avatar/img',
    DELETE_AVATAR_IMG: '/api/avatar/img',
    // GET_ALL_IMGS: 'api/auth/img/all',
    // EDIT_IMG: 'api/auth/img'
}
