<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="items">
        <!--        <button-->
        <!--            v-for="(item, index) in items"-->
        <!--            :key="index"-->
        <!--            class="item"-->
        <!--            :class="{ 'is-selected': index === selectedIndex }"-->
        <!--            @click="selectItem(index)"-->
        <!--        >-->
        <!--            {{ item }}-->
        <!--        </button>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class MentionsList extends Vue {
    @Prop() items: []
    @Prop() command: ({ _id }: { _id: number }) => void

    selectedIndex = 0

    @Watch('items')
    changedItems() {
        this.selectedIndex = 0
    }

    onKeyDown({ event }: { event: KeyboardEvent }) {
        if (event.key === 'ArrowUp') {
            this.upHandler()
            return true
        }

        if (event.key === 'ArrowDown') {
            this.downHandler()
            return true
        }

        if (event.key === 'Enter') {
            this.enterHandler()
            return true
        }

        return false
    }

    upHandler() {
        this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length
    }

    downHandler() {
        this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    }

    enterHandler() {
        this.selectItem(this.selectedIndex)
    }

    selectItem(index: number) {
        const item = this.items[index]

        if (item) {
            this.command({ _id: item })
        }
    }
}
</script>

<style lang="scss">
.items {
    position: relative;
    border-radius: 0.25rem;
    background: white;
    color: rgba(black, 0.8);
    overflow: hidden;
    font-size: 0.9rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.item {
    display: block;
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0.2rem 0.5rem;

    &.is-selected,
    &:hover {
        color: #a975ff;
        background: rgba(#a975ff, 0.1);
    }
}
</style>
