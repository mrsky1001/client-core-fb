<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div>
        <router-link to="/store">
            <v-img class="footer-img" :src="footerImg"></v-img>
        </router-link>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { mapMutations, mapState } from 'vuex'
import footerStore from '@/core/store/app/app-footer.store'

@Component({
    store: footerStore,
    computed: {
        ...mapState(['footerImg']),
    },
    methods: {
        ...mapMutations(['resetFooterImg']),
    },
    mounted() {
        footerStore.commit('resetFooterImg')
    },
    watch: {
        $route() {
            footerStore.commit('resetFooterImg')
        },
    },
})
export default class FooterImg extends Vue {}
</script>

<style lang="scss" scoped>
.footer-img {
    max-width: 400px;

    /* height: 300px; */
    margin-left: 10px;
    position: absolute;
    bottom: 7px;
    right: 0;
    float: left;
    padding-right: 119px;
    padding-bottom: 90px;

    .v-image__image {
        background-position: right !important;
    }
}

@media screen and (max-width: 1264px) {
    .footer-img {
        position: relative;
    }
}

@media screen and (max-width: 708px) {
    .footer-img {
        position: relative;
        width: 60%;
    }
}
</style>
