<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-footer color="black" class="caption my-footer" padless>
        <v-row style="margin: 0">
            <v-col cols="12" sm="12" md="12" lg="7">
                <v-row class="my-row">
                    <v-col cols="12" sm="12" md="12" lg="1"></v-col>
                    <v-col cols="12" sm="10" md="10" lg="11" style="text-align: justify; align-items: baseline">
                        <AppRoutes></AppRoutes>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" lg="1"></v-col>
                    <v-col cols="12" sm="10" md="3" lg="3">
                        <Contacts></Contacts>
                    </v-col>
                    <v-col cols="12" sm="2" md="1" lg="1"></v-col>
                    <v-col cols="12" sm="10" md="5" lg="6">
                        <SocialNetwork></SocialNetwork>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="4" class="grey--text font-weight-bold">
                <v-row>
                    <v-col class="copyright-col">
                        <Copyright></Copyright>
                    </v-col>
                    <v-col>
                        <FooterImg></FooterImg>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import footerStore from '@/core/store/app/app-footer.store'
import AppRoutes from '@/core/components/app/AppFooter/AppRoutes.vue'
import Contacts from '@/core/components/app/AppFooter/Contacts.vue'
import SocialNetwork from '@/core/components/app/AppFooter/SocialNetwork.vue'
import Copyright from '@/core/components/app/AppFooter/Copyright.vue'
import FooterImg from '@/core/components/app/AppFooter/FooterImg.vue'

@Component({
    store: footerStore,
    components: { FooterImg, Copyright, SocialNetwork, Contacts, AppRoutes },
})
export default class AppFooter extends Vue {}
</script>

<style lang="scss" scoped>
.my-footer {
    z-index: 0;
    color: grey !important;
}

.copyright-col {
    min-width: 250px;
}

@media screen and (max-width: 1264px) {
    .my-footer {
        flex-direction: column;
        padding: 25px 0 0 0 !important;
    }
}
</style>
