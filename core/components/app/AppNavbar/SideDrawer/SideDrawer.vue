<!--
  - Copyright (©) 15.10.2021, 15:43. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-list nav dense>
        <v-navigation-drawer :value="nav.isShowDrawer" fixed @transitionend="changeDrawer">
            <v-list dense nav class="my-slider">
                <v-list-item href="https://foma-blog.ru">
                    <a href="https://foma-blog.ru/" class="logo-link">
                        <v-img :src="require('@/core/assets/fb15.svg')" max-width="150" />
                        <!--            <v-img :src="require('@/core/assets/fomka&#45;&#45;small2.svg')" class="fomka-logo-img" />-->
                    </a>
                </v-list-item>
                <template v-for="route in routerST.routes">
                    <SubRoute
                        v-if="route.onMainBar && !route.onCenterSidebar"
                        :key="'container ' + route.name"
                        :route="route"
                    />

                    <div v-if="route.isGroup" :key="'group of ' + route.name">
                        <div v-for="subRoute in routerST.subRoutes(route)" :key="'sub route ' + subRoute.name">
                            <SubRoute :route="subRoute" />
                            <div v-if="subRoute.isCenterSidebar">
                                <SubRoute
                                    v-for="centerRoute in routerST.centerRoutes"
                                    :key="'center route ' + centerRoute.name"
                                    :route="centerRoute"
                                />
                            </div>
                        </div>
                        <div :key="'subline' + route.name">
                            <hr class="spacer-hr" />
                        </div>
                    </div>
                </template>
                <v-divider></v-divider>
                <v-list-item>Авторизация</v-list-item>
                <SubRoute v-for="route in routerST.avatarRoutes" :key="'avatar ' + route.name" :route="route" />
                <v-divider></v-divider>
                <v-list-item>Мы в социальных сетях</v-list-item>
                <v-list-item href="https://www.instagram.com/foma.blog.ru/">
                    <v-list-item-icon>
                        <v-icon> mdi-instagram</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Instagram</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item href="https://www.behance.net/foma_design">
                    <v-list-item-icon>
                        <v-icon> Be</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Behance</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item href="https://t.me/fomablogru">
                    <v-list-item-icon>
                        <v-icon> mdi-telegram</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Telegram</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item href="https://www.youtube.com/channel/UC_k_rdwbeDwf1KbMQmyK_pw/">
                    <v-list-item-icon>
                        <v-icon> mdi-youtube</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Youtube</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item href="https://vk.com/fomablog">
                    <v-list-item-icon>
                        <v-icon> mdi-vk</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>VK</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import '../app-nav-bar.scss'
import { vxc } from '@/core/store/store.vuex'
import SubRoute from '@/core/components/app/AppNavbar/common/SubRoute.vue'

@Component({
    components: { SubRoute },
})
export default class SideDrawer extends Vue {
    drawer = 0
    nav = vxc.appNavbar
    routerST = vxc.router

    changeDrawer() {
        if (this.drawer === 3) {
            this.nav.setIsShowDrawer(false)
            this.drawer = 0
        } else {
            this.drawer++
        }
    }
}
</script>

<style lang="scss">
.v-list--nav .v-list-item {
    padding: 0 10px 8px !important;
}
.logo-link {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.v-navigation-drawer {
    width: calc(100% - 48px);
    height: 100vh;
}
</style>
