<!--
  - Copyright (©) 15.10.2021, 14:44. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <div v-if="checkRole(route.role)">
    <hr
      v-if="route.hasSubLine"
      class="spacer-hr"
    >
    <v-list-item :to="route.path">
      <v-list-item-icon>
        <v-icon>{{ route.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ route.text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
import authStore from '@/core/store/auth/auth.store'
import '../app-nav-bar.scss'

@Component({
    methods: {
        checkRole: authStore.getters.checkRole,
    },
})
export default class SubRoute extends Vue {
    @Prop({ required: true })
    route
}
</script>

<style lang="scss" scoped></style>
