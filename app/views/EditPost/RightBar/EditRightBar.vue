<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <right-column class="right-column">
        <images-grid></images-grid>
    </right-column>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import RightColumn from '@/core/components/grid/RightColumn/RightColumn.vue'
import Vue from 'vue'
import ImagesGrid from '@/app/views/EditPost/extensions/ImagesGrid.vue'

@Component({
    components: { RightColumn, ImagesGrid },
})
export default class RightBar extends Vue {}
</script>

<style scoped lang="scss">
.right-column {
}
</style>
