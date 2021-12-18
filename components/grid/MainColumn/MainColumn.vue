<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-col style="z-index: 1" :cols="cols" :lg="lg" :md="md" :sm="sm" class="min-width-700-lg">
        <slot />
    </v-col>
</template>

<script>
export default {
    name: 'MainColumn',
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
            default: 5,
        },
        cols: {
            type: [String, Number],
            default: 12,
        },
    },
}
</script>

<style lang="scss">
@media (max-width: 1904px) and (min-width: 960px) {
    .min-width-700-lg {
        //min-width: 700px;
    }
}
</style>
