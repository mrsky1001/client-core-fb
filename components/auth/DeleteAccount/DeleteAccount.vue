<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-main class="auth-card">
        <v-container>
            <v-row justify="center">
                <v-card>
                    <v-card-title> Удаление аккаунта</v-card-title>
                    <v-card-text>
                        <form>
                            <p>Вы уверены что хотите удалить аккаунт?</p>
                            <Recaptcha
                                :on-verify="onVerify"
                                :on-expired="onExpired"
                                :set-ref-recaptcha="setRefRecaptcha"
                            ></Recaptcha>
                            <v-row>
                                <v-btn link plain small @click="callDeleteAccount"> Да, удалить!</v-btn>
                                <v-btn @click="goToHome"> Нет, вернуться</v-btn>
                            </v-row>
                        </form>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import routesObj from '../../../../app/routes/routes-obj'
import '../styles/auth-card.scss'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapMutations } from 'vuex'
import accountStore from '../../../store/auth/account.store'
import { handlerError } from '@/core/lib/response-handler'
import Recaptcha from '../Recaptcha/Recaptcha'
import '../styles/reCaptcha.scss'

@Component({
    store: accountStore,
    methods: {
        ...mapMutations(['onVerify', 'setRefRecaptcha', 'onExpired']),
        ...mapActions(['deleteAccount', 'resetRecaptcha']),
        callDeleteAccount() {
            this.deleteAccount()
                .then(() => {
                    this.goToHome()
                })
                .catch((err) => {
                    this.resetRecaptcha()
                    handlerError(err)
                })
        },
        goToHome() {
            this.$router.push(routesObj.HOME)
        },
    },
    components: {
        Recaptcha,
    },
})
export default class DeleteAccount extends Vue {}
</script>

<style lang="scss"></style>
