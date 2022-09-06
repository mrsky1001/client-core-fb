<!--
  - Copyright (c) 14.01.2022, 10:43  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <div class="sections-block">
        <div class="sections-btns">
            <v-btn v-for="section in homeST.sections" :key="section.id" plain rounded :to="getLink(section.id)">
                {{ section.name }}{{ getTypeText(section.id) }}
            </v-btn>
            <v-btn plain rounded :to="routesObj.HOME">Все статьи{{ getTypeText() }}</v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'
import routesObj from '@/app/routes/routes-obj'
import { Watch } from 'vue-property-decorator'
import homeViewTypes from '@/core/collections/home-view-types'

@Component
export default class Sections extends Vue {
    homeST = vxa.home
    routesObj = routesObj
    typeText = ''

    getLink(sectionId: string) {
        return { name: routesObj.SECTION.name, params: { sectionId } }
    }

    getTypeText(sectionId: string | undefined) {
        if ((!sectionId && !this.$route.params.sectionId) || this.$route.params.sectionId === sectionId) {
            return this.typeText
        } else return ''
    }

    mounted() {
        void this.homeST.getSections()
        const type = Object.values(homeViewTypes).find((val) => val.number === this.homeST.typeHomeView)
        this.typeText = type && type.number > 1 ? `(${type.description})` : ''
    }

    @Watch('homeST.typeHomeView')
    afterChangedTypeHomeView() {
        const type = Object.values(homeViewTypes).find((val) => val.number === this.homeST.typeHomeView)
        this.typeText = type && type.number > 1 ? `(${type.description})` : ''
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
