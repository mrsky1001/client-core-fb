/*
 * Copyright (c) 17.12.2021, 22:22  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import PostStore from '@/app/store/post.store'
import HomeStore from '@/app/store/home.store'
import EditPostStore from '@/app/store/edit-post.store'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        ...extractVuexModule(PostStore),
        ...extractVuexModule(HomeStore),
        ...extractVuexModule(EditPostStore),
    },
})

export const vxa = {
    post: createProxy(store, PostStore),
    home: createProxy(store, HomeStore),
    edit: createProxy(store, EditPostStore),
}
