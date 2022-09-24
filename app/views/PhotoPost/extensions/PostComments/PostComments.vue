<!--
  - Copyright (c) 08.12.2021, 19:08  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <v-card shaped elevation="0">
        <div class="to-up-block" @click="goToUp">
            <v-btn icon x-large>
                <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
        </div>
        <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">Комментарии</div>

            <v-timeline align-top dense>
                <v-timeline-item icon="mdi-panda" fill-dot :title="title">
                    <template v-if="authST.user.avatar" v-slot:icon>
                        <v-avatar>
                            <img :src="authST.user.avatar" />
                        </v-avatar>
                    </template>
                    <div>
                        <div class="font-weight-normal">
                            <ValidationObserver ref="obs" v-slot="{ invalid, handleSubmit }">
                                <v-form
                                    :disabled="!authST.isAuth"
                                    @keydown.native.enter.prevent="handleSubmit(postST.addComment)"
                                >
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        name="comment"
                                        vid="comment"
                                        immediate
                                        :rules="postST.validCommentRules"
                                    >
                                        <v-text-field
                                            outlined
                                            label="Ваш комментарий..."
                                            :disabled="isDisabledInp"
                                            :value="postST.commentContent"
                                            :error-messages="errors"
                                            @change="postST.setComment"
                                        />
                                    </ValidationProvider>
                                    <v-row>
                                        <div class="comment-btn">
                                            <div v-if="authST.isAuth" class="recaptcha-block">
                                                <Recaptcha v-show="postST.commentContent.length > 0" />
                                            </div>
                                            <div>
                                                <v-btn
                                                    right
                                                    color="secondary"
                                                    :disabled="isDisabledBtn"
                                                    @click="handleSubmit(postST.addComment)"
                                                >
                                                    <template v-if="!postST.isDisabledSendComment">
                                                        <v-icon>mdi-upload</v-icon>
                                                    </template>

                                                    <template v-if="postST.isDisabledSendComment">
                                                        <v-progress-circular
                                                            :size="100"
                                                            :width="12"
                                                            :rotate="90"
                                                            :value="postST.sendTime * 1.7"
                                                            color="teal"
                                                            style="margin-right: 8px; width: 25px"
                                                        >
                                                            {{ postST.sendTime }}
                                                        </v-progress-circular>
                                                    </template>
                                                    Отправить
                                                </v-btn>

                                                <v-btn v-if="!authST.isAuth" :to="routesObj.LOGIN">
                                                    <v-icon>{{ routesObj.LOGIN.icon }}</v-icon>
                                                    Войти
                                                </v-btn>
                                            </div>
                                        </div>
                                    </v-row>
                                </v-form>
                            </ValidationObserver>
                        </div>
                    </div>
                </v-timeline-item>
                <template v-for="msg in postST.comments">
                    <v-timeline-item :key="msg.creatingDate" color="green">
                        <template v-if="msg.author.avatar" v-slot:icon>
                            <v-avatar>
                                <img :src="msg.author.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <div class="font-weight-normal">
                                <strong>{{ msg.author.username }}</strong> ({{ getDate(msg.creatingDate) }})
                            </div>
                            <div>{{ msg.content }}</div>
                        </div>
                    </v-timeline-item>
                </template>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'
import PostHeader from '@/app/views/Post/extensions/PostHeader/PostHeader.vue'
import { max, min } from 'vee-validate/dist/rules'
import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate'
import Recaptcha from '@/core/components/auth/Recaptcha/Recaptcha.vue'
import { vxc } from '@/core/store/store.vuex'
import { isProfanity } from '@/core/lib/text-validation.lib'
import { dateAndTime } from '@/core/lib/date.lib'
import { routesObj } from '@/app/routes/routes-obj'
import exceptions from '@/core/collections/exceptions'

setInteractionMode('eager')

extend('min', {
    ...min,
    message: 'Поле должно содержать не менее {length} символов',
})

extend('max', {
    ...max,
    message: 'Поле должно содержать не более {length} символов',
})

extend('regex-valid-text', {
    validate(value: string) {
        return !isProfanity(value.toLowerCase())
    },
    message: 'Ненормативная лексика запрещена!',
})

@Component({
    components: { PostHeader, Recaptcha, ValidationObserver, ValidationProvider },
})
export default class PostComments extends Vue {
    postST = vxa.post
    authST = vxc.auth
    routesObj = routesObj

    get isDisabledInp() {
        return !this.authST.isAuth || this.postST.isDisabledSendComment
    }

    get isDisabledBtn() {
        return this.isDisabledInp || this.postST.commentContent.length === 0
    }

    get title() {
        if (!this.authST.isAuth) {
            return exceptions.NOT_ALLOWED_COMMENT.text
        } else if (this.postST.isDisabledSendComment) {
            return exceptions.ONE_COMMENT_IN_MIN.text
        } else {
            return
        }
    }

    goToUp() {
        window.scroll(0, 700)
    }

    getDate(date: string) {
        return dateAndTime(date)
    }
}
</script>

<style lang="scss">
//@keyframes img-scale {
//  from {
//    transform: scale(1);
//    -webkit-transform: scale(1);
//    -moz-transform: scale(1);
//    -o-transform: scale(1);
//  }
//
//  to {
//    transform: scale(1.1);
//    -webkit-transform: scale(1.1);
//    -moz-transform: scale(1.1);
//    -o-transform: scale(1.1);
//  }
//}

.to-up-block {
    z-index: 3;
    position: fixed;
    top: 90%;
    right: 6%;
    opacity: 26%;

    .v-btn {
        background: white;
    }

    &:hover {
        opacity: 100%;
    }
}

.comment-btn {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .recaptcha-block {
        width: 60%;
        height: 50%;
    }

    > :last-child {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        flex-direction: row;

        > * {
            margin: 0 0 0 15px;
        }
    }
}

.my-sheet {
    //margin: 20px 0 0 0;

    &:not(:first-child) {
        //margin: 50px 0 0 0;
    }

    .v-card,
    .v-sheet {
        //box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1) !important;
        //box-shadow: none !important;
    }

    .tags-footer {
        padding: 0 20px 10px 20px;
        font-size: small;
        color: gray;

        .left-col {
            padding: 0;
        }
    }

    .footer-annotation {
        .left-col {
            padding: 30px 30px 30px 20px;
            font-size: small;
            color: gray;
        }
    }

    .v-btn.btn-read {
        color: gray;
    }

    .annotation-img {
        //min-height: 250px;
        margin: 0 15px 0 15px;
    }

    .my-card-text {
        font-size: large;
    }
}
</style>
