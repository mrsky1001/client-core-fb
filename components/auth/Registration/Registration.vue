<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-main class="registration-form auth-card">
        <v-row justify="center">
            <v-card>
                <v-card-title>Регистрация</v-card-title>
                <v-card-text>
                    <ValidationObserver ref="obs" v-slot="{ invalid, handleSubmit }">
                        <v-form @keyup.native.enter="handleSubmit(callSubmit)">
                            <ValidationProvider name="username" :rules="validUsernameRules" v-slot="{ errors }">
                                <v-text-field
                                    required
                                    autofocus
                                    outlined
                                    label="Имя"
                                    :value="username"
                                    :error-messages="errors"
                                    @change="setUsername"
                                ></v-text-field>
                            </ValidationProvider>
                            <ValidationProvider name="email" :rules="validEmailRules" v-slot="{ errors }">
                                <v-text-field
                                    required
                                    outlined
                                    label="E-mail"
                                    :value="email"
                                    :error-messages="errors"
                                    @change="setEmail"
                                ></v-text-field>
                            </ValidationProvider>
                            <ValidationProvider name="password" :rules="validPasswordRules" v-slot="{ errors }">
                                <v-text-field
                                    required
                                    outlined
                                    autocomplete="off"
                                    label="Пароль"
                                    :value="password"
                                    :error-messages="errors"
                                    :type="isShowPassword ? 'text' : 'password'"
                                    :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @change="setPassword"
                                    @click:append="setIsShowPassword(!isShowPassword)"
                                ></v-text-field>
                            </ValidationProvider>

                            <Recaptcha
                                :on-verify="onVerify"
                                :on-expired="onExpired"
                                :set-ref-recaptcha="setRefRecaptcha"
                            ></Recaptcha>
                            <v-row>
                                <v-btn link plain small :to="loginRoute"> Войти</v-btn>
                                <v-btn @click="handleSubmit(callSubmit)"> Зарегистрироваться</v-btn>
                            </v-row>
                        </v-form>
                    </ValidationObserver>
                </v-card-text>
            </v-card>
        </v-row>
    </v-main>
</template>

<script>
import registrationStore from '../../../store/auth/registration.store'
import { mapActions, mapMutations, mapState } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { required, min, max, email, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Recaptcha from '../Recaptcha/Recaptcha'
import { handlerError } from '@/core/lib/response-handler'
import routesObj from '@/app/router/routes/routes-obj'
import '../styles/auth-card.scss'
import '../styles/reCaptcha.scss'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: 'Поле не должно быть пустым',
})

extend('min', {
    ...min,
    message: 'Поле должно содержать не менее {length} символов',
})

extend('max', {
    ...max,
    message: 'Поле должно содержать не более {length} символов',
})

extend('email', {
    ...email,
    message: 'Не корректный e-mail',
})

extend('regex', {
    ...regex,
    message: 'Поле должно содержать только латинские символы и цифры',
})

@Component({
    store: registrationStore,
    computed: {
        ...mapState([
            'username',
            'email',
            'password',
            'loginRoute',
            'isShowPassword',
            'validUsernameRules',
            'validEmailRules',
            'validPasswordRules',
        ]),
    },
    methods: {
        ...mapMutations([
            'setUsername',
            'setRefRecaptcha',
            'setPassword',
            'setEmail',
            'setIsShowPassword',
            'onVerify',
            'onExpired',
        ]),
        ...mapActions(['regAccount', 'resetRecaptcha']),
        callSubmit() {
            this.regAccount()
                .then((res) => {
                    if (res) {
                        this.$router.push(routesObj.HOME)
                    } else {
                        this.resetRecaptcha()
                    }
                })
                .catch((err) => handlerError(err))
        },
    },
    components: {
        Recaptcha,
        ValidationProvider,
        ValidationObserver,
    },
})
export default class Registration extends Vue {}
</script>

<style lang="scss" scoped>
.registration-form {
}
</style>
