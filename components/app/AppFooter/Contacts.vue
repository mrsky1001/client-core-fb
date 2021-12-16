<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <div>
    <p class="font-weight-bold grey--text header-map-text p-size-h2">
      <v-icon class="grey--text">
        mdi-message-text-outline
      </v-icon>
      Контакты для связи:
    </p>
    <v-btn
      plain
      class="footer-btn font-weight-black"
      color="white"
      target="_blank"
      href="mailto:foma.blog@yandex.ru"
    >
      foma.blog@yandex.ru
    </v-btn>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Contacts extends Vue {}
</script>

<style lang="scss" scoped>
.header-map-text {
    width: fit-content;
    border-bottom: 2px solid;
}

.p-size-h2 {
    font-size: 0.875rem;
}

.header-map-text {
    width: fit-content;
    border-bottom: 2px solid;
}
</style>
