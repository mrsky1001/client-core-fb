<!--
  - Copyright (©) 15.10.2021, 15:43. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <v-list
    nav
    dense
  >
    <v-navigation-drawer
      :value="isShowDrawer"
      fixed
      @transitionend="changeDrawer"
    >
      <v-list
        dense
        nav
        class="my-slider"
      >
        <template v-for="route in routes">
          <SubRoute
            v-if="route.onMainBar && !route.onCenterSidebar"
            :key="'container ' + route.name"
            :route="route"
          />

          <div
            v-if="route.isGroup"
            :key="'group of ' + route.name"
          >
            <div
              v-for="subRoute in getSubRoutes(route)"
              :key="'sub route ' + subRoute.name"
            >
              <SubRoute :route="subRoute" />
              <div v-if="subRoute.isCenterSidebar">
                <SubRoute
                  v-for="centerRoute in centerRoutes"
                  :key="'center route ' + centerRoute.name"
                  :route="centerRoute"
                />
              </div>
            </div>
            <div :key="'subline' + route.name">
              <hr class="spacer-hr">
            </div>
          </div>
        </template>
        <SubRoute
          v-for="route in avatarRoutes"
          :key="'avatar ' + route.name"
          :route="route"
        />
      </v-list>
    </v-navigation-drawer>
  </v-list>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import navbarStore from '@/core/store/app/app-navbar'
import routerStore from '@/core/store/app/router.store'
import { mapGetters, mapMutations, mapState } from 'vuex'
import SubRoute from '@/core/components/app/AppNavbar/common/SubRoute.vue'
import '../app-nav-bar.scss'

@Component({
    components: { SubRoute },
    store: navbarStore,
    data() {
        return {
            drawer: 0,
        }
    },
    computed: {
        ...mapState(['routes', 'centerRoutes', 'isShowDrawer', 'searchText', 'isShowSearch']),
        ...mapGetters(['avatarRoutes']),
    },
    methods: {
        changeDrawer() {
            if (this.drawer === 3) {
                this.setIsShowDrawer(false)
                this.drawer = 0
            } else {
                this.drawer++
            }
        },
        getSubRoutes: routerStore.getters.getSubRoutes,
        ...mapMutations(['setIsShowDrawer', 'setSearchText', 'setIsShowSearch']),
    },
})
export default class SideDrawer extends Vue {}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
    width: calc(100% - 48px);
    height: 100vh;
}
</style>
