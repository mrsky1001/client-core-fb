<!--
  - Copyright (©) 18.10.2021, 12:40. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-snackbar timeout="-1" bottom color="blue" :value="!isAgreeCookie" @change="setAgreeCookie">
        <strong>
            Мы используем
            <a style="color: white" target="_blank" href="https://policies.google.com/technologies/cookies">Cookie</a>
            <v-icon> mdi-cookie</v-icon>
        </strong>
        <template #action="{ attrs }">
            <v-btn text v-bind="attrs" @click="setAgreeCookie"> Согласен</v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import cookieStore from '../../../store/auth/cookie.store'
import { mapMutations, mapState } from 'vuex'

@Component({
    store: cookieStore,
    computed: {
        ...mapState(['isAgreeCookie']),
    },
    methods: {
        ...mapMutations(['setAgreeCookie']),
    },
})
export default class SnackBar extends Vue {}
</script>

<style lang="scss" scoped></style>
