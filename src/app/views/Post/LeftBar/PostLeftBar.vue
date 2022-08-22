<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <left-column>
        <div>
            <div class="ads-desktop">
                <div id="yandex_rtb_R-A-1248339-1" />
            </div>
            <div class="ads-mobile">
                <div id="yandex_rtb_R-A-1248339-8" />
            </div>
        </div>
        <!--    <div v-if="!isDev">-->
        <!--      <div class="ads-desktop">-->
        <!--        <div id="yandex_rtb_R-A-1248339-9"></div>-->
        <!--      </div>-->
        <!--      <div class="ads-mobile">-->
        <!--        <div id="yandex_rtb_R-A-1248339-10"></div>-->
        <!--      </div>-->
        <!--    </div>-->
    </left-column>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import LeftColumn from '@/core/components/grid/LeftColumn/LeftColumn.vue'

@Component({
    components: { LeftColumn },
})
export default class PostLeftBar extends Vue {}
</script>
<style scoped lang="scss">
.ads-desktop {
    position: absolute;
    max-width: 400px !important;
    bottom: 0;
    opacity: 0.1;
    padding: 3vw;
    vertical-align: bottom;

    &:hover {
        opacity: 0.5;
    }
}

.ads-mobile {
    display: none;
}

@media screen and (max-width: 1264px) {
    .ads-desktop-left {
        display: none;
    }

    .ads-mobile {
        display: block;
    }
}
</style>
