/*
 * Copyright (©) 21.10.2021, 11:51. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

export default {
    LOGIN: '/api/loginST',
    ROLES: '/api/roles',
    REGISTRATION: '/api/registration',
    LOGOUT: '/api/logout',
    IS_AUTHORIZED: '/api/is-authorized',
    GET_USER: '/api/user',
    UPDATE_USER: '/api/user',
    DELETE_USER: '/api/user',

    GET_USERS: '/api/users',
    CREATE_USER: '/api/user',
    GET_USER_BY_ID: '/api/user',
    UPDATE_USER_BY_ID: '/api/user',
    DELETE_USER_BY_ID: '/api/user',

    SEARCH: '/api/search/:search',

    GET_POSTS: '/api/posts',
    GET_POST_BY_ID: '/api/post-id',
    GET_POSTS_BY_SECTION: '/api/posts',
    GET_POST_BY_TITLE: '/api/post',
    CREATE_POST: '/api/post',
    UPDATE_POST_BY_ID: '/api/post-id',

    SET_POST_LIKE: '/api/post-like',
    DELETE_POST_LIKE: '/api/post-like',

    UPDATE_POST_STATUS: '/api/post-status',
    ADD_POST_SHARE: '/api/post-share',

    GET_PRODUCTS: '/api/product',
    GET_PRODUCT_BY_ID: '/api/product-id',
    GET_PRODUCT_BY_TITLE: '/api/product',
    CREATE_PRODUCT: '/api/product',
    UPDATE_PRODUCT_BY_ID: '/api/product-id',

    GET_IMG: '/api/uploads/images',
    GET_IMG_OLD: '/uploads/images',

    UPLOAD_PRODUCT_IMG: '/api/product-img',
    DELETE_PRODUCT_IMG: '/api/product-img',

    UPLOAD_POST_IMG: '/api/post-img',
    DELETE_POST_IMG: '/api/post-img',

    UPLOAD_AVATAR_IMG: '/api/avatar-img',
    DELETE_AVATAR_IMG: '/api/avatar-img',
    // GET_ALL_IMGS: 'api/authST/img/all',
    // EDIT_IMG: 'api/authST/img'
}
