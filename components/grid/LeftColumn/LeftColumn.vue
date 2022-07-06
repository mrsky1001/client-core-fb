<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="left-col">
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class LeftColumn extends Vue {}
</script>

<style lang="scss" scoped>
.left-col {
    padding: 0 10px 0 10px;
    margin-top: 5rem;

    min-width: 25vw;
}

@media screen and (max-width: 1235px) {
    .left-col {
        width: 90vw;
    }
}
</style>
