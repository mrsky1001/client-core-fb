<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <v-sheet v-if="rtbId" rounded="lg" class="my-sheet">
        <v-card>
            <div :id="rtbId" />
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import { connectOneAds } from '@/app/lib/yandex-ads'
import Component from 'vue-class-component'

@Component
export default class AdsSheet extends Vue {
    rtbId = ''

    mounted() {
        connectOneAds(this.rtbId)
    }
}
</script>

<style lang="scss">
.my-sheet {
    //margin: 20px 0 0 0;

    &:not(:first-child) {
        //margin: 50px 0 0 0;
    }

    .tags-footer {
        padding: 0 20px 10px 20px;
        font-size: small;
        color: gray;

        .left-col {
            padding: 0;
        }
    }

    .footer-annotation {
        .left-col {
            padding: 30px 30px 30px 20px;
            font-size: small;
            color: gray;
        }
    }

    .v-btn.btn-read {
        color: gray;
    }

    .annotation-img {
        //min-height: 250px;
        margin: 0 15px 0 15px;
    }

    .my-card-text {
        font-size: large;
    }
}
</style>
