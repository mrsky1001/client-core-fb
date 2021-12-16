<!--
  - Copyright (©) 12.10.2021, 12:39. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <v-menu
    ref="avatarBarRef"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        :class="'avatar-bar-btn ' + getAvatarClass"
        v-on="on"
      >
        <v-icon v-if="!avatar || isErrAva">
          mdi-cat
        </v-icon>
        <v-avatar v-if="avatar && !isErrAva">
          <v-img
            :src="avatar"
            @error="setIsErrAva"
          />
        </v-avatar>
      </v-btn>
    </template>

    <v-list>
      <template v-for="route in avatarRoutes">
        <v-list-item
          :key="route.name"
          :to="route.path"
        >
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ route.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import navbarStore from '@/core/store/app/app-navbar'
import { mapGetters, mapMutations, mapState } from 'vuex'

@Component({
    store: navbarStore,
    computed: {
        ...mapState(['routes', 'isErrAva', 'isShowDrawer', 'avatar', 'searchText', 'isShowSearch']),
        ...mapGetters(['getAvatarClass', 'avatarRoutes']),
    },
    methods: {
        ...mapMutations(['setIsShowDrawer', 'setIsErrAva', 'setSearchText', 'setIsShowSearch']),
    },
    mounted() {
        console.log(this.avatar)
    },
    watch: {
        '$route.fullPath'() {
            this.$forceUpdate()
        },
    },
})
export default class AvatarBar extends Vue {}
</script>

<style lang="scss" scoped>
.v-avatar {
    min-width: 38px !important;
    width: 38px !important;
    height: auto !important;
}
.avatar-bar-btn {
    margin-right: 5px !important;

    &.active-btn {
        color: #00bd007d !important;
    }
}

@media screen and (min-width: 0px) and (max-width: 959px) {
    .avatar-bar-btn {
        display: none;
    }
}
</style>
