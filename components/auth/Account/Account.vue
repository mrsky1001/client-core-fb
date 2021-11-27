<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-main class="account-form auth-card">
        <ModalImageMenu
            :show-modal="isShowAvaMenuModal"
            :set-show-modal="setIsShowAvaMenuModal"
            :delete-img="deleteAvatar"
            :upload-img="showAvaUploadModal"
        ></ModalImageMenu>
        <ModalImageUploader
            :show-modal="isShowAvaUploadModal"
            :set-show-modal="setIsShowUploadModal"
            :img="avatar"
            :set-img="saveAvatar"
            :cropper-options="cropOpts"
        ></ModalImageUploader>
        <v-row justify="center">
            <v-card>
                <v-card-title>Учетная запись</v-card-title>
                <v-card-text>
                    <ValidationObserver ref="obs" v-slot="{ invalid, handleSubmit }">
                        <v-form @keyup.native.enter="handleSubmit(saveAccount)">
                            <ValidationProvider
                                name="username"
                                vid="username"
                                immediate
                                :rules="validUsernameRules"
                                v-slot="{ errors }"
                            >
                                <AvatarField
                                    :avatar="avatar"
                                    :username="username"
                                    :click-avatar-img="showAvaMenuModal"
                                    :set-username="setUsername"
                                    :errors="errors"
                                ></AvatarField>
                                <input :value="username" style="display: none" />
                            </ValidationProvider>

                            <ValidationProvider name="email" :rules="validEmailRules" v-slot="{ errors }">
                                <v-text-field
                                    outlined
                                    label="E-mail"
                                    :value="email"
                                    :error-messages="errors"
                                    @change="setEmail"
                                ></v-text-field>
                            </ValidationProvider>
                            <ValidationProvider name="password" :rules="validPasswordRules" v-slot="{ errors }">
                                <v-text-field
                                    outlined
                                    autocomplete="off"
                                    label="Новый пароль"
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
                                <v-btn link plain small :to="delRoute"> Удалить аккаунт</v-btn>
                                <v-btn @click="handleSubmit(saveAccount)"> Сохранить</v-btn>
                            </v-row>
                        </v-form>
                    </ValidationObserver>
                </v-card-text>
            </v-card>
        </v-row>
    </v-main>
</template>

<script>
import accountStore from '../../../store/auth/account.store'
import { mapActions, mapMutations, mapState } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { required, min, max, email, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Recaptcha from '../Recaptcha/Recaptcha'
import ModalImageUploader from '@/core/components/app/ModalImageUploader/ModalImageUploader'
import AvatarField from '@/core/components/auth/Account/AvatarField/AvatarField'
import '../styles/auth-card.scss'
import '../styles/reCaptcha.scss'
import ModalImageMenu from '@/core/components/app/ModalImageUploader/ModalImageMenu'

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
    store: accountStore,

    computed: {
        ...mapState([
            'username',
            'email',
            'avatar',
            'password',
            'delRoute',
            'isLoaded',
            'isShowPassword',
            'isShowAvaMenuModal',
            'isShowAvaUploadModal',
            'validUsernameRules',
            'validEmailRules',
            'validPasswordRules',
        ]),
    },
    methods: {
        ...mapMutations([
            'setUsername',
            'setPassword',
            'setEmail',
            'setIsShowPassword',
            'setRefRecaptcha',
            'setIsShowAvaMenuModal',
            'setIsShowUploadModal',
            'saveAvatar',
            'onVerify',
            'onExpired',
        ]),
        ...mapActions(['saveAccount', 'getAccountData', 'deleteAvatar']),
        showAvaUploadModal() {
            this.setIsShowUploadModal(true)
            this.setIsShowAvaMenuModal(false)
        },
        showAvaMenuModal() {
            if (this.avatar && this.isLoaded) {
                this.setIsShowUploadModal(false)
                this.setIsShowAvaMenuModal(true)
            } else {
                this.setIsShowUploadModal(true)
            }
        },
    },
    mounted() {
        this.getAccountData()
    },
    components: {
        ModalImageMenu,
        AvatarField,
        ModalImageUploader,
        Recaptcha,
        ValidationProvider,
        ValidationObserver,
    },
})
export default class Account extends Vue {
    cropOpts = {
        isShowCircleChk: false,
        isShowQualityFld: false,
        isShowFullAreaBtn: false,
        isShowExpansionPnl: false,
        isShowAspectRatioFld: false,
        isShowProportionalChk: false,
        maxCropperHeight: 300,
    }
}
</script>

<style lang="scss" scoped>
.account-form {
}
</style>
