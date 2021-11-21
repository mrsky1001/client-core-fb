/*
 * Copyright (c) 21.11.2021, 23:51  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */
import { AxiosError, AxiosResponse } from 'axios'
import { IAppMessage } from '@/core/models/interfaces/app/IAppMessage'
import snackbarStore from '@/core/store/app/snackbar.store'
import routesObj from '@/app/router/routes/routes-obj'
import { IRoute } from '@/core/models/interfaces/app/IRoute'

export const responseHandler = (res: AxiosResponse, msg?: IAppMessage | null, isShowMsg = true): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (res.data.success) {
            if (isShowMsg) {
                let props = {}

                if (msg && res.data.message) {
                    props = {
                        msg: msg.text,
                        classes: msg.classes,
                        params: [res.data.message],
                    }
                } else if (res.data.message) {
                    props = {
                        msg: res.data.message,
                        classes: 'green',
                    }
                } else if (msg) {
                    props = {
                        msg: msg.text,
                        classes: msg.classes,
                    }
                }

                snackbarStore.commit('setSnackBarMsg', props)
            }

            resolve(res.data.data)
        } else {
            reject(res.data.message)
        }
    })
}

export const handlerError = (err: AxiosError, checkAuth = false, redirect?: IRoute | null, isShowMsg = true): void => {
    const hostPath = window.location.protocol + '//' + window.location.host

    if (checkAuth && err.response) {
        switch (err.response.status) {
            case 403: {
                const pathLogin = hostPath + routesObj.LOGIN.path

                if (window.location.href !== pathLogin) {
                    window.location.href = pathLogin
                }

                break
            }
        }
    }

    if (isShowMsg && err) {
        const props = { classes: 'red', msg: '' }

        if (err.response && err.response.data && err.response.data.message) {
            props.msg = err.response.data.message
        } else {
            props.msg = err.message
        }

        // console.error(props.msg)
        snackbarStore.commit('setSnackBarMsg', props)
    } else {
        console.error(err)
    }

    if (redirect) {
        window.location.href = hostPath + redirect.path
    }
    // throw err
}
