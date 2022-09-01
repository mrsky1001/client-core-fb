<!--
  - Copyright (©) 27.07.2021, 10:05. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-list-item class="grow my-list-items" style="justify-content: space-between">
        <v-row v-if="authST.isEditor" class="view-tabs">
            <v-btn
                title="Только черновики"
                text
                :class="typeHomeView === types.DRAFT.number ? 'is-active' : null"
                @click="setTypeHomeView(types.DRAFT.number)"
            >
                <v-icon>mdi-upload-off</v-icon>
            </v-btn>
            <v-btn
                title="Только опубликованные"
                text
                :class="typeHomeView === types.PUBLISHED.number ? 'is-active' : null"
                @click="setTypeHomeView(types.PUBLISHED.number)"
            >
                <v-icon>mdi-upload</v-icon>
            </v-btn>
        </v-row>
        <v-row class="view-tabs" justify="end">
            <v-btn
                title="Показать таблицей"
                text
                :class="typeHomeView === types.TABLE.number ? 'is-active' : null"
                @click="setTypeHomeView(types.TABLE.number)"
            >
                <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
            <v-btn
                title="Показать карточками"
                text
                :class="typeHomeView === types.CARDS ? 'is-active' : null"
                @click="setTypeHomeView(types.CARDS)"
            >
                <v-icon>mdi-view-quilt</v-icon>
            </v-btn>
        </v-row>
    </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxc } from '@/core/store/store.vuex'
import homeViewTypes from '@/core/collections/homeViewTypes'

import { vxa } from '@/app/store/store.app'

@Component({
    props: {
        typeHomeView: {
            type: Number,
            required: true,
        },
        setTypeHomeView: {
            type: Function,
            required: true,
        },
    },
})
export default class TypeCardsBar extends Vue {
    authST = vxc.auth
    types = homeViewTypes
    // toggleFilter(filter: IPostsFilter) {
    //     const f = this.homeST.selectedFilters.find((f) => f.text === filter.text)
    // }
}
</script>

<style lang="scss" scoped>
.list-filter {
    .v-list-item {
        .v-icon {
            margin-right: 10px !important;
        }
    }
}

.view-tabs {
    .v-btn {
        color: gray;
    }

    .is-active {
        color: #121c36;
    }
}
</style>
