<!--
  - Copyright (©) 12.10.2021, 12:39. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <v-menu
    v-if="!isShowSearch"
    offset-y
    class="sub-notes"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        key="routesObj"
        plain
        color="gray"
        active-class="active-btn"
        v-bind="attrs"
        :class="'font-weight-bold ' + activeClass"
        v-on="on"
      >
        <p class="my-label">
          {{ noteRoute.text }}
        </p>
        <v-icon>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <template v-for="subRoute in getSubRoutes(route)">
        <div :key="subRoute.name">
          <hr
            v-if="subRoute.hasSubLine"
            class="spacer-hr"
          >

          <v-list-item
            v-if="checkRole(subRoute.role)"
            class="sublist-item"
            :to="subRoute.path"
          >
            <v-list-item-icon>
              <v-icon>{{ subRoute.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ subRoute.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import navbarStore from '@/core/store/app/app-navbar'
import { mapMutations, mapState } from 'vuex'
import authStore from '@/core/store/auth/auth.store'
import routerStore from '@/core/store/app/router.store'
import '../app-nav-bar.scss'

@Component({
    props: {
        route: {
            type: Object,
            required: true,
        },
    },
    store: navbarStore,
    computed: {
        ...mapState(['noteRoute', 'activeClass', 'isShowSearch']),
    },
    methods: {
        checkRole: authStore.getters.checkRole,
        getSubRoutes: routerStore.getters.getSubRoutes,
        ...mapMutations(['setNoteTab']),
        callSetNoteTab() {
            navbarStore.commit('setNoteTab', { $route: this.$route, $forceUpdate: this.$forceUpdate })
        },
    },
    watch: {
        '$route.fullPath'() {
            this.callSetNoteTab()
        },
        selectedSection() {
            this.callSetNoteTab()
        },
    },
})
export default class SubRoutes extends Vue {}
</script>

<style lang="scss" scoped>
.my-label {
    margin: 0 !important;
}
.sublist-item:hover {
    color: #00bd007d !important;
}
</style>
