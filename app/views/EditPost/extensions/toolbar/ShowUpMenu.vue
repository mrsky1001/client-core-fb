<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<!--<template>-->
<!--  <bubble-menu class="my-bubble-menu" :editor="editor" v-if="editor" :tippy-options="options">-->
<!--    <v-card class="my-menu-card">-->
<!--      <v-row class="my-menu-row" v-for="row in buttonsRows" :key="row.id">-->
<!--        <v-btn-->
<!--          x-small-->
<!--          plain-->
<!--          v-for="(btn, key) in row.buttons"-->
<!--          @click="-->
<!--            editor-->
<!--              .chain()-->
<!--              .focus()-->
<!--              [btn.click]()-->
<!--              .run()-->
<!--          "-->
<!--          :key="key"-->
<!--          :title="btn.text"-->
<!--          :class="btn.classes"-->
<!--        >-->
<!--          <v-icon aria-hidden="false">-->
<!--            {{ btn.icon }}-->
<!--          </v-icon>-->
<!--        </v-btn>-->
<!--      </v-row>-->
<!--    </v-card>-->
<!--  </bubble-menu>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { BubbleMenu } from '@tiptap/vue-2'-->

<!--export default {-->
<!--  name: 'ShowUpMenu',-->
<!--  props: {-->
<!--    editor: {-->
<!--      type: Object,-->
<!--      required: true-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      buttonsRows: [-->
<!--        {-->
<!--          id: 0,-->
<!--          buttons: [-->
<!--            {-->
<!--              text: 'Жирный',-->
<!--              icon: 'mdi-format-bold',-->
<!--              click: 'toggleBold',-->
<!--              classes: { 'is-active': this.editST.editor.isActive('bold') }-->
<!--            },-->
<!--            {-->
<!--              text: 'Курсив',-->
<!--              icon: 'mdi-format-italic',-->
<!--              click: 'toggleItalic',-->
<!--              classes: { 'is-active': this.editST.editor.isActive('italic') }-->
<!--            },-->
<!--            {-->
<!--              text: 'Зачеркнутый',-->
<!--              icon: 'mdi-format-strikethrough',-->
<!--              click: 'toggleStrike',-->
<!--              classes: { 'is-active': this.editST.editor.isActive('strike') }-->
<!--            }-->
<!--          ]-->
<!--        },-->
<!--        {-->
<!--          id: 1,-->
<!--          buttons: [-->
<!--            {-->
<!--              text: 'По левому краю',-->
<!--              icon: 'mdi-format-bold',-->
<!--              click: 'toggleBold',-->
<!--              classes: { 'is-active': this.editST.editor.isActive('bold') }-->
<!--            },-->
<!--            {-->
<!--              text: 'По центру',-->
<!--              icon: 'mdi-format-italic',-->
<!--              click: 'toggleItalic',-->
<!--              classes: { 'is-active': this.editST.editor.isActive('italic') }-->
<!--            },-->
<!--            {-->
<!--              text: 'По правому краю',-->
<!--              icon: 'mdi-format-strikethrough',-->
<!--              click: 'toggleStrike',-->
<!--              classes: { 'is-active': this.editST.editor.isActive('strike') }-->
<!--            },-->
<!--            {-->
<!--              text: 'По ширине',-->
<!--              icon: 'mdi-format-strikethrough',-->
<!--              click: 'toggleStrike',-->
<!--              classes: { 'is-active': this.editST.editor.isActive('strike') }-->
<!--            }-->
<!--          ]-->
<!--        }-->
<!--      ],-->
<!--      options: {-->
<!--        trigger: 'focusin'-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  components: { BubbleMenu }-->
<!--}-->
<!--</script>-->
<!--<style lang="scss">-->
<!--.my-bubble-menu {-->
<!--  .my-menu-card {-->
<!--    padding: 5px;-->

<!--    .my-menu-row {-->
<!--      margin: 5px;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
