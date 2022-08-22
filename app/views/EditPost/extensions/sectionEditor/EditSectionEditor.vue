<!--
  - Copyright (c) 12.01.2022, 19:22  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <div v-show="editST.isShowEditSectionForm">
        <v-divider></v-divider>
        <v-card-title>Редактирование раздела</v-card-title>
        <v-card-text>
            <v-text-field
                outlined
                label="Имя раздела"
                :value="editST.editSection.name"
                @change="editST.setNameEditSection"
            ></v-text-field>
            <v-textarea
                auto-grow
                rows="1"
                label="Описание"
                outlined
                :value="editST.editSection.description"
                @change="editST.setDescriptionEditSection"
            ></v-textarea>
            <div class="section-btn">
                <v-btn title="Удалить раздел" @click="editST.deleteSection">
                    <v-icon>mdi-trash-can-outline</v-icon></v-btn
                >
                <v-btn class="ml-3" color="success" title="Сохранить изменения в разделе" @click="editST.updateSection">
                    <v-icon>mdi-content-save-edit-outline</v-icon>
                </v-btn>
            </div>
        </v-card-text>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'

@Component
export default class EditSectionEditor extends Vue {
    editST = vxa.edit
}
</script>

<style scoped lang="scss">
.section-btn {
    display: flex;
    flex-direction: row;
    justify-content: right;
}
</style>
