<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-card>
        <v-card-text>
            <div class="no-posts">
                <v-img max-width="300" :src="foma"></v-img>
                <div class="text-no-posts">
                    <p class="text-center">{{ description }}</p>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
// @ts-ignore
import foma from '../../../../public/img/foma.png'
import { vxc } from '@/core/store/store.vuex'

@Component
export default class NoPosts extends Vue {
    foma = foma
    nav = vxc.appNavbar

    get description() {
        return this.nav.searchText.length
            ? 'Упс, по запросу "' + this.nav.searchText + '" статьи не найдены :('
            : 'Упс, статьи не найдены :('
    }
}
</script>
<style lang="scss" scoped>
.no-posts {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;

    .text-no-posts {
        background-color: #171210;
        margin-top: 50px;
        width: 200px;
        height: 120px;
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        border: 1px solid;
        font-weight: 800;
        border-top-left-radius: 300px;
        border-top-right-radius: 300px;
        border-bottom-right-radius: 300px;
        border-bottom-left-radius: 10px;
        align-items: center;
    }
}
</style>
