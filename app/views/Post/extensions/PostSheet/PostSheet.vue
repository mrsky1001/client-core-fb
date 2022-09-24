<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-sheet rounded="lg" class="my-sheet">
        <div class="my-sheet-container">
            <post-header :post="post" />
            <v-card-text>
                <photo-post-content :post="post" />
            </v-card-text>

            <v-card-actions class="btns-actions" :title="titleButtons">
                <v-btn
                    text
                    title="Мне нравится"
                    :disabled="!authST.isAuth"
                    :color="postST.hasLikeUser ? 'red' : ''"
                    @click="postST.setLike"
                >
                    <v-icon>mdi-heart-multiple-outline</v-icon>
                    Мне нравится
                </v-btn>
            </v-card-actions>
            <v-card-text>
                <v-divider style="text-align: center" />
            </v-card-text>
            <post-comments></post-comments>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { IPost } from '@/core/models/interfaces/article/IPost'
import PostHeader from '@/app/views/Post/extensions/PostHeader/PostHeader.vue'
import PostContent from '@/app/views/Post/extensions/PostContent/PostContent.vue'
import PostComments from '@/app/views/Post/extensions/PostComments/PostComments.vue'
import { vxa } from '@/app/store/store.app'
import { vxc } from '@/core/store/store.vuex'
import PhotoPostContent from '@/app/views/PhotoPost/extensions/PostContent/PhotoPostContent.vue'

@Component({
    components: { PhotoPostContent, PostComments, PostHeader, PostContent },
})
export default class PostSheet extends Vue {
    authST = vxc.auth
    postST = vxa.post
    titleButtons = this.authST.isAuth ? '' : 'Возможность взаимодействия доступна авторизованным пользователям'
    @Prop() post!: IPost
}
</script>

<style lang="scss">
.my-sheet {
    //.my-sheet-container {
    //  padding: 0 10px 0 10px;
    //}
    .btns-actions {
        display: flex;
        flex-direction: row;
        //justify-content: flex-end;
        flex-wrap: wrap;
    }

    .animation-icon {
        &:hover,
        &.active {
            color: indianred !important;
        }
    }

    .my-row-chip {
        margin-top: 5px !important;

        .my-chip {
            color: gray !important;
            background: transparent !important;

            .v-chip__content {
                padding: 5px;
            }

            :hover {
                color: black;
                background: #e0e0e0;
                border-radius: 14px;
            }
        }
    }

    .post-content {
        white-space: pre-wrap;
    }
}
</style>
