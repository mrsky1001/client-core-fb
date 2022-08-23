<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <right-column>
        <div class="ads-container">
            <div class="ads-desktop">
                <div id="yandex_rtb_R-A-1248338-15" />
            </div>
            <div class="ads-mobile">
                <div id="yandex_rtb_R-A-1248338-14" />
            </div>
        </div>
    </right-column>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import RightColumn from '@/core/components/grid/RightColumn/RightColumn.vue'
import { connectOneAds } from '@/app/lib/yandex-ads'

@Component({
    components: { RightColumn },
})
export default class PostRightBar extends Vue {
    mounted() {
        connectOneAds('yandex_rtb_R-A-1248338-14')
        connectOneAds('yandex_rtb_R-A-1248338-15')
    }
}
</script>
<style scoped lang="scss">
.ads-container {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
}

.ads-desktop,
.ads-mobile {
    opacity: 0.1;
    padding: 3vw;
    vertical-align: bottom;

    &:hover {
        opacity: 0.5;
    }
}
//
//@media screen and (max-width: 1264px) {
//    .ads-desktop-left {
//        display: none;
//    }
//
//    .ads-mobile {
//        display: block;
//    }
//}
</style>
