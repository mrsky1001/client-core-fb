/*
 * Copyright (c) 16.01.2022, 17:54  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Section from '@/core/models/classes/article/Section'
import routesObj from '@/app/routes/routes-obj'
import User from '@/core/models/classes/auth/User'

export default new Section({
    name: routesObj.HOME.text,
    description: routesObj.HOME.meta.description,
    author: new User(),
    domain: 'all',
    posts: [],
    creatingDate: new Date(),
})
