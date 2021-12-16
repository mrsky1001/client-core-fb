<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
  <v-dialog
    :value="showModal"
    @click:outside="setShowModal(false)"
  >
    <v-card class="modal-img-menu">
      <v-card-title> Загрузить / удалить изображение</v-card-title>
      <v-divider />

      <div class="btn-group">
        <v-btn
          color="primary"
          @click="uploadImg"
        >
          <v-icon>mdi-image-plus</v-icon>
          Загрузить
        </v-btn>
        <v-btn @click="deleteImg">
          <v-icon>mdi-image-minus</v-icon>

          Удалить
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({
    props: {
        deleteImg: { type: Function, required: true },
        uploadImg: { type: Function, required: true },
        showModal: { type: Boolean, required: true },
        setShowModal: { type: Function, required: true },
    },
})
export default class ModalImageMenu extends Vue {}
</script>

<style lang="scss">
.v-dialog {
    max-width: 360px;
    margin-top: -30px !important;
}
.modal-img-menu {
    .btn-group {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        padding: 20px;
        .v-btn {
            margin: 10px 0;
        }
    }
}

@media screen and (max-width: 580px) {
    .v-dialog {
        margin: 0 !important;
    }
}
</style>
