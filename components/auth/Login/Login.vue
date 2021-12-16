<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <v-main class="login-form auth-card">
    <v-container>
      <v-row justify="center">
        <v-card>
          <v-card-title> Вход</v-card-title>
          <v-card-text class="card-body">
            <ValidationObserver
              ref="obs"
              v-slot="{ invalid, handleSubmit }"
            >
              <v-form @keyup.native.enter="handleSubmit(callLogin)">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="login"
                  :rules="validRules"
                >
                  <v-text-field
                    outlined
                    autofocus
                    label="Логин"
                    :value="login"
                    :error-messages="errors"
                    @change="setLogin"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="password"
                  :rules="validRules"
                >
                  <v-text-field
                    required
                    outlined
                    label="Пароль"
                    autocomplete="off"
                    :value="password"
                    :error-messages="errors"
                    :type="isShowPassword ? 'text' : 'password'"
                    :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @change="setPassword"
                    @click:append="setIsShowPassword(!isShowPassword)"
                  />
                </ValidationProvider>
                <Recaptcha
                  :on-verify="onVerify"
                  :on-expired="onExpired"
                  :set-ref-recaptcha="setRefRecaptcha"
                />
                <v-row>
                  <v-btn
                    link
                    plain
                    small
                    :to="regRoute"
                  >
                    Зарегистрироваться
                  </v-btn>
                  <v-btn @click="handleSubmit(callLogin)">
                    Войти
                  </v-btn>
                </v-row>
              </v-form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import loginStore from '../../../store/auth/login.store'
import { mapActions, mapMutations, mapState } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import routesObj from '@/app/routes/routes-obj'
import { handlerError } from '@/core/lib/response-handler'
import Recaptcha from '../Recaptcha/Recaptcha'
import '../styles/auth-card.scss'
import '../styles/reCaptcha.scss'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: 'Поле не должно быть пустым',
})

@Component({
    store: loginStore,
    computed: {
        ...mapState(['login', 'password', 'prevRoute', 'regRoute', 'validRules', 'isShowPassword']),
    },
    methods: {
        ...mapMutations([
            'setLogin',
            'setPassword',
            'setPrevRoute',
            'setIsShowPassword',
            'setRefRecaptcha',
            'onVerify',
            'onExpired',
        ]),
        ...mapActions(['loginAccount', 'resetRecaptcha']),
        callLogin() {
            this.loginAccount()
                .then((res) => {
                    if (res) {
                        if (this.prevRoute.path === routesObj.REGISTRATION.path) {
                            this.$router.push(routesObj.HOME)
                        } else {
                            this.$router.push(this.prevRoute)
                        }
                    } else {
                        this.resetRecaptcha()
                    }
                })
                .catch((err) => {
                    this.resetRecaptcha()
                    handlerError(err)
                })
        },
    },
    components: {
        Recaptcha,
        ValidationProvider,
        ValidationObserver,
    },
    beforeRouteEnter(to, from, next) {
        next(() => {
            loginStore.commit('setPrevRoute', from)
        })
    },
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login-form {
}
</style>
