<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <left-column></left-column>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import LeftColumn from '@/core/components/grid/LeftColumn/LeftColumn.vue'

@Component({ components: { LeftColumn } })
export default class LeftBar extends Vue {}
</script>

<style scoped lang="scss"></style>
