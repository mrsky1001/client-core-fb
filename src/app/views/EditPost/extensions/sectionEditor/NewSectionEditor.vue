<!--
  - Copyright (c) 12.01.2022, 19:23  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <div v-show="editST.isShowNewSectionForm">
        <v-divider></v-divider>
        <v-card-title>Создание нового раздела</v-card-title>
        <v-card-text>
            <v-text-field
                outlined
                label="Имя раздела"
                placeholder="Введите имя раздела"
                @change="editST.setNameNewSection"
            ></v-text-field>
            <v-textarea
                auto-grow
                rows="1"
                label="Описание"
                outlined
                @change="editST.setDescriptionNewSection"
            ></v-textarea>
            <div class="section-btn">
                <v-btn color="success" title="Добавить раздел" @click="editST.addSection">
                    <v-icon>mdi-plus</v-icon>
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
export default class NewSectionEditor extends Vue {
    editST = vxa.edit
}
</script>

<style scoped lang="scss">
.section-btn {
    display: flex;
    flex-direction: row;
    justify-content: right;
}
.sections-btns {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}
</style>
