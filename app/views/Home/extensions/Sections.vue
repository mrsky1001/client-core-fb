<!--
  - Copyright (c) 14.01.2022, 10:43  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <div class="sections-block">
        <div class="sections-btns">
            <v-btn v-for="section in homeST.sections" :key="section.id" plain rounded :to="getLink(section.id)">
                {{ section.name }}
            </v-btn>
            <v-btn plain rounded :to="routesObj.HOME"> Все статьи </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'
import routesObj from '@/app/routes/routes-obj'

@Component
export default class Sections extends Vue {
    homeST = vxa.home
    routesObj = routesObj

    getLink(sectionId: string) {
        return { name: routesObj.SECTION.name, params: { sectionId } }
    }

    mounted() {
        void this.homeST.getSections()
    }
}
</script>

<style scoped lang="scss">
.sections-block {
    margin-top: 18px;
    position: sticky;
    top: 90px;
    display: flex;
}

.sections-btns {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
}

@media screen and (max-width: 1250px) {
    .sections-block {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sections-btns {
        max-width: available;
        align-items: center;
    }
}
</style>
