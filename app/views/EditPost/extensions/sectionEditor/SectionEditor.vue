<!--
  - Copyright (c) 12.01.2022, 19:23  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
  -->

<template>
    <div>
        <v-card class="card-sections">
            <v-card-title>Раздел для статьи<span class="red--text">*</span></v-card-title>
            <v-card-text>
                <div class="sections-btns">
                    <v-select
                        outlined
                        return-object
                        :items="editST.sections"
                        item-text="name"
                        item-value="id"
                        label="Выберите / создайте раздел для статьи"
                        :value="editST.post.sectionId"
                        @change="editST.setSectionId"
                    ></v-select>
                    <v-btn icon large title="Редактировать раздел" @click="editST.setIsShowEditSectionForm()">
                        <v-icon dense>mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <v-btn icon large title="Добавить раздел" @click="editST.setIsShowNewSectionForm()">
                        <v-icon dense>mdi-plus</v-icon>
                    </v-btn>
                </div>
                <edit-section-editor></edit-section-editor>
                <new-section-editor></new-section-editor>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { vxa } from '@/app/store/store.app'
import EditSectionEditor from '@/app/views/EditPost/extensions/sectionEditor/EditSectionEditor.vue'
import NewSectionEditor from '@/app/views/EditPost/extensions/sectionEditor/NewSectionEditor.vue'

@Component({
    components: { EditSectionEditor, NewSectionEditor },
})
export default class SectionEditor extends Vue {
    editST = vxa.edit

    mounted() {
        void this.editST.getSections()
    }
}
</script>

<style scoped lang="scss">
.v-card__title {
    color: rgba(0, 0, 0, 0.6);
}

.card-sections {
    box-shadow: none !important;
}

.sections-btns {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}

@media screen and (max-width: 1250px) {
}
</style>
