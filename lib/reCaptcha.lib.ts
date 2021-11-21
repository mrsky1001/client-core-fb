/*
 * Copyright (c) 21.11.2021, 23:51  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import snackbarStore from '@/core/store/app/snackbar.store'

const reCaptchaLib = {
    errorEvent: (): void => {
        const props = { classes: 'red', msg: 'Не выполнена проверка reCaptcha!' }
        snackbarStore.commit('setSnackBarMsg', props)
        // throw Error(props.msg)
    },
}

export default reCaptchaLib
