<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="post-header">
        <v-card-title style="padding: 16px 16px 25px 16px">
            <h1>
                <router-link class="my-router-link" :to="postST.getPostRoute(post)">
                    {{ post.title }}
                </router-link>
            </h1>
        </v-card-title>

        <v-card-actions class="my-card-actions">
            <v-list-item class="my-list-item">
                <v-list-item-avatar v-if="post.author.avatar && !hasErrorImg" class="my-avatar">
                    <v-img :src="post.author.avatar" @error="errorImgEvent" />
                </v-list-item-avatar>
                <v-list-item-avatar v-if="hasErrorImg" class="my-avatar">
                    <v-icon> mdi-panda</v-icon>
                </v-list-item-avatar>
                <v-list-item-action-text>
                    <v-list-item-title>@{{ post.author.username }}</v-list-item-title>
                </v-list-item-action-text>
                <v-row align="center" justify="end" class="my-row-item-action">
                    <v-list-item-action-text v-if="authST.isEditor" :title="postST.statusObj(post.status).text">
                        <v-list-item-title>
                            <v-icon small :color="postST.statusObj(post.status).color">
                                {{ postST.statusObj(post.status).icon }}
                            </v-icon>
                        </v-list-item-title>
                    </v-list-item-action-text>

                    <v-list-item-action-text v-show="post.readTime > 0" title="Время чтения">
                        <v-list-item-title>
                            <v-icon small> mdi-clock-outline</v-icon>
                            {{ post.readTime }} мин.
                        </v-list-item-title>
                    </v-list-item-action-text>
                    <v-list-item-action-text v-show="post.likes.length > 0" title="Нравится">
                        <v-list-item-title>
                            <v-icon small> mdi-thumb-up-outline</v-icon>
                            {{ post.likes.length }}
                        </v-list-item-title>
                    </v-list-item-action-text>
                    <v-list-item-action-text v-show="post.countComments > 0" title="Комментарии">
                        <v-list-item-title>
                            <v-icon small> mdi-comment-text-outline</v-icon>
                            {{ post.countComments }}
                        </v-list-item-title>
                    </v-list-item-action-text>
                    <v-list-item-action-text v-show="post.views" title="Просмотров">
                        <v-list-item-title>
                            <v-icon small> mdi-eye-outline</v-icon>
                            {{ post.views }}
                        </v-list-item-title>
                    </v-list-item-action-text>
                    <header-buttons v-if="authST.isEditor" :post="post" />
                </v-row>
            </v-list-item>
        </v-card-actions>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Post from '../../../../../core/models/classes/article/Post'
import { Prop } from 'vue-property-decorator'
import HeaderButtons from '@/app/views/Post/extensions/PostHeader/HeaderButtons/HeaderButtons.vue'
import { vxc } from '@/core/store/store.vuex'
import { vxa } from '@/app/store/store.app'

@Component({
    components: { HeaderButtons },
})
export default class PostHeader extends Vue {
    authST = vxc.auth
    postST = vxa.post
    @Prop() post!: Post
    hasErrorImg = false

    errorImgEvent(err: string) {
        if (err) this.hasErrorImg = true
        else this.hasErrorImg = false
    }
}
</script>

<style lang="scss" scoped>
.post-header {
    .my-list-item {
        padding: 0 16px 0 10px;
        justify-content: space-between;
    }

    .my-row-item-action {
        > * {
            margin-left: 15px;
        }
    }

    .my-rounded-up {
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;
    }

    .my-avatar {
        max-width: 35px;
        height: 35px !important;
        min-width: 35px !important;
    }

    //.my-list-item-avatar {
    //    margin: 0 10px 0 0 !important;
    //}

    .my-card-actions {
        height: 25px;
        //padding: 0 !important;
        //margin: 0 !important;
    }

    .v-icon {
        vertical-align: baseline;
    }
}

/**
  For all routers
 */

.my-router-link {
    color: #2c3e50;
    font-size: 28px;
    text-decoration: none;
    word-break: break-word;
    //opacity: 60% !important;
}

//.my-router-link:hover {
//  opacity: 60% !important;
//}
@media (min-width: 1000px) {
    .edit-button-menu {
        min-width: 50px;
        padding: 6px;
    }
}
</style>
