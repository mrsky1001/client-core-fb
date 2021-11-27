/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

import config from '../../../config/config'
import axios, { AxiosInstance } from 'axios'
import authStore from '@/core/store/auth/auth.store'

export default (): AxiosInstance => {
    return axios.create({
        baseURL: config.server.fullHost,
        headers: { Authorization: `Bearer ${authStore.state.user.token}` },
    })
}
