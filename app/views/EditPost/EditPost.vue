<!--
  - Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
  -->

<template>
    <div class="edit-post">
        <delete-post></delete-post>
        <div v-show="!!editST.messageAutoSave" class="auto-save-timer">
            <p>{{ editST.messageAutoSave }}</p>
        </div>
        <annotation-header-img></annotation-header-img>
        <flex-container>
            <left-bar></left-bar>
            <!--                <v-overlay opacity="0.2" :absolute="absolute" :value="loading" style="min-height: 300px !important">-->
            <!--                    <v-icon class="my-icon-spin text-h2"> mdi-autorenew </v-icon>-->
            <!--                </v-overlay>-->
            <main-container></main-container>
            <right-bar></right-bar>
        </flex-container>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { vxa } from '@/app/store/store.app'
import AnnotationHeaderImg from '@/app/views/EditPost/extensions/annotation/AnnotationHeaderImg.vue'
import LeftBar from '@/app/views/EditPost/LeftBar/EditLeftBar.vue'
import RightBar from '@/app/views/EditPost/RightBar/EditRightBar.vue'
import MainContainer from '@/app/views/EditPost/MainContainer/EditMainContainer.vue'
import FlexContainer from '@/app/components/FlexContainer/FlexContainer.vue'
import { Watch } from 'vue-property-decorator'
import {
    afterStartEditor,
    beforeDestroyedEditor,
} from '@/app/views/EditPost/extensions/editor/customElements/after-editor-handlers'
import { IRoute } from '@/core/models/interfaces/app/IRoute'
import routesObj from '@/app/routes/routes-obj'
import DeletePost from '@/app/views/Post/extensions/DeletePost/DeletePost.vue'

@Component({
    components: {
        FlexContainer,
        AnnotationHeaderImg,
        MainContainer,
        RightBar,
        LeftBar,
        DeletePost,
    },
})
export default class EditPostPage extends Vue {
    editST = vxa.edit

    keydownHandler(e: KeyboardEvent) {
        if (e.code === 'KeyS' && (navigator.userAgent.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault()
            this.editST.save()
        }
    }

    // @Watch('editST.post.content')
    // changedPost(val: string) {
    //     console.log('changedPost', val)
    //     this.editST.editor.commands.setContent(val)
    //
    //     // if (val !== current) {
    //     //     this.editST.editor.destroy()
    //     //     this.editST.editor = customEditor(this.editST.post.content, (val) => this.editST.setContent(val))
    //     //     afterStartEditor(this.keydownHandler, () => null)
    //     // }
    // }

    mounted() {
        this.editST.editor.on('update', ({ editor }) => {
            this.editST.setContent(editor.getHTML())
        })

        afterStartEditor(this.keydownHandler, () => null)
        window.scrollTo(0, 0)
    }

    @Watch('$route')
    changedRoute(val: IRoute) {
        if (val.name === routesObj.NEW_POST.name) {
            beforeDestroyedEditor(this.keydownHandler, () => null)
            this.editST.reset(this.$router)
        }
    }

    beforeDestroyed() {
        clearInterval(this.editST.autoSaveTimer)
        beforeDestroyedEditor(this.keydownHandler, () => null)
        this.editST.editor.destroy()
    }

    created() {
        const props = { postId: this.$route.params.postId, title: this.$route.params.title }

        if (props.postId && props.title) {
            this.editST.getPost(props)
        }

        this.editST.setRouter(this.$router)
    }

    metaInfo() {
        return {
            title: 'Epiloge - Build your network in your field of interest',
            meta: [
                {
                    name: 'description',
                    content:
                        'Epiloge is about connecting in your field of interest. Our vision is to help people share their knowledge, work, projects, papers and ideas and build their network through what they do rather where they live, study or work.',
                },
                { property: 'og:title', content: 'Epiloge - Build your network in your field of interest' },
                { property: 'og:site_name', content: 'Epiloge' },
                { property: 'og:type', content: 'website' },
                { name: 'robots', content: 'index,follow' },
            ],
        }
    }
}
</script>
<style lang="scss" scoped>
.edit-post {
    .auto-save-timer {
        position: sticky;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        top: 95vh;
        align-items: center;
        color: gray;
        z-index: 7;

        p {
            position: absolute;
        }
    }

    .main-container {
        //padding-top: 100px !important;
    }

    .annotation-img {
        max-height: 720px !important;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
}

@keyframes blinker {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.my-icon-spin {
    z-index: 1;
    animation: blinker 1.5s cubic-bezier(1, 1, 1, 1) infinite;
}
</style>
