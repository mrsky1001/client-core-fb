<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-sheet shaped class="my-sheet">
        <v-card class="my-annotation-card">
            <v-card-title>Домен статьи<span class="red--text">*</span></v-card-title>
            <v-card-text class="my-card-text">
                <v-select
                    outlined
                    :items="domains"
                    item-text="description"
                    item-value="name"
                    label="Выберите домен для статьи"
                    :value="editST.post.domain"
                    @change="editST.setDomain"
                ></v-select>
            </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <section-editor />
        <v-divider></v-divider>
        <v-card class="my-annotation-card">
            <v-card-title>Редактирование статьи<span class="red--text">*</span></v-card-title>
            <v-card-text class="my-card-text">
                <v-textarea
                    outlined
                    auto-grow
                    rows="1"
                    label="Заголовок"
                    class="my-title"
                    :value="editST.post.title"
                    @input="(val) => editST.setTitle(val)"
                    @change="(val) => editST.setTitle(val)"
                ></v-textarea>
                <div class="my-annotation">
                    <v-textarea
                        auto-grow
                        rows="5"
                        label="Аннотация"
                        outlined
                        :value="editST.post.annotation.text"
                        @input="(val) => editST.setAnnotationText(val)"
                        @change="(val) => editST.setAnnotationText(val)"
                    ></v-textarea>
                </div>
                <tags></tags>
                <annotation-img></annotation-img>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import AnnotationImg from '@/app/views/EditPost/extensions/annotation/AnnotationImg.vue'
import Vue from 'vue'
import { vxa } from '@/app/store/store.app'
import SectionEditor from '../sectionEditor/SectionEditor.vue'
import Tags from '@/app/views/EditPost/extensions/Tags.vue'
import domains from '@/core/collections/domains'

@Component({ components: { SectionEditor, Tags, AnnotationImg } })
export default class AnnotationCard extends Vue {
    editST = vxa.edit
    domains = Object.values(domains)
}
</script>

<style lang="scss" scoped>
.my-annotation-card {
    //box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;

    .v-card__title {
        color: rgba(0, 0, 0, 0.6);
        //padding: 16px 0;
    }

    .my-annotation {
        //padding: 0 20px;

        font-weight: normal;
    }

    .my-title {
        font-size: large;
        //padding-top: 30px;
        //padding-left: 20px;
        //padding-right: 20px;
    }
}

@media screen and (max-width: 1000px) {
    .v-card__text,
    .my-title,
    .my-annotation,
    .v-card__subtitle,
    .v-card__text,
    .v-card__title {
        padding-top: initial;
        padding-left: 0 !important;
        //margin: 0 !important;
    }

    .my-title {
        font-size: large !important;
    }
}
</style>
