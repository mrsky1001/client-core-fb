<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-col :cols="cols" :lg="lg" :md="md" :sm="sm" class="my-left-col">
        <v-container>
            <slot />
        </v-container>
    </v-col>
</template>

<script>
export default {
    name: 'LeftColumn',
    props: {
        sm: {
            type: [String, Number],
            default: 12,
        },
        md: {
            type: [String, Number],
            default: 12,
        },
        lg: {
            type: [String, Number],
            default: 3,
        },
        cols: {
            type: [String, Number],
            default: 12,
        },
    },
}
</script>

<style lang="scss">
.my-left-col {
    z-index: 1;
}
</style>
