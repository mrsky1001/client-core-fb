/*
 * Copyright (c) 21.11.2021, 21:49  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export interface ISnackbarProps {
    msg: string
    classes: string
    params: string[]
}
const snackBarStore = new Vuex.Store({
    state: {
        snackBarMsg: '',
        snackBarParams: '',
        snackBarClasses: '',
        isShowSnackbar: false,
    },
    mutations: {
        setShowSnackbar(state, val) {
            state.isShowSnackbar = val
        },
        setSnackBarMsg(state, props) {
            const showMsg = () => {
                state.snackBarMsg = props.msg
                state.snackBarClasses = props.classes
                state.snackBarParams = props.params
                state.isShowSnackbar = true
            }

            if (state.isShowSnackbar) {
                state.isShowSnackbar = false
                state.snackBarMsg = ''
                state.snackBarClasses = ''
                state.snackBarParams = ''

                setTimeout(() => {
                    showMsg()
                }, 100)
            } else {
                showMsg()
            }
        },
    },
})

export default snackBarStore
