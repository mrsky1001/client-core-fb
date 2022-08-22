<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-btn
        text
        small
        active-class="is-active"
        :title="title"
        :disabled="disabled"
        :class="(isActive && isActive() ? 'is-active' : '') + ' menu-item ' + classes"
        @click="action"
    >
        <v-icon :dense="isSmall">{{ icon }}</v-icon>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class MenuItem extends Vue {
    @Prop() icon: string
    @Prop() title: string
    @Prop() disabled: boolean
    @Prop() isSmall: boolean
    @Prop() classes: string
    @Prop() action!: () => void
    @Prop() isActive!: () => string
}
</script>

<style lang="scss">
.menu-item {
    min-width: 2rem !important;
    max-width: 2rem !important;
    width: 2rem !important;
    padding: 5px;
    opacity: 0.65;
    margin: 2px;
    color: #2c3e50 !important;

    &.is-active,
    &:hover {
        opacity: 1;
        //color: #2c3e50 !important;
        //background-color: #00bd007d;
    }
}
</style>
