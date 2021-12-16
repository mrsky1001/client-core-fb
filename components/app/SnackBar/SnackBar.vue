<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <div class="text-center">
    <v-snackbar
      top
      class="app-snackbar"
      :value="isShowSnackbar"
      :color="snackBarClasses"
      @change="setShowSnackbar"
    >
      <strong>
        {{ snackBarMsg }}
        {{ snackBarParams }}
      </strong>
      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="setShowSnackbar(false)"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import snackbarStore from '../../../store/app/snackbar.store'
import { mapMutations, mapState } from 'vuex'

@Component({
    store: snackbarStore,
    computed: {
        ...mapState(['isShowSnackbar', 'snackBarClasses', 'snackBarMsg', 'snackBarParams']),
    },
    methods: {
        ...mapMutations(['setShowSnackbar']),
    },
})
export default class SnackBar extends Vue {}
</script>

<style lang="scss" scoped>
.app-snackbar {
    margin-top: 70px;
    font-weight: bold !important;

    .v-snack__content {
        font-weight: bold !important;
    }
}
</style>
