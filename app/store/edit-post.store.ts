/*
 * Copyright (c) 27.11.2021, 20:07  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */
/*
 * Copyright (c) 21.11.2021, 21:36  Kolyada Nikita Vladimirovich nikita.nk16@yandex.ru
 */

import Vuex from 'vuex'
import Vue from 'vue'
import {action, createModule, mutation} from 'vuex-class-component'
import {addPost, changeStatusPost, editPost, getInValidPostFields, getPost} from '@/core/services/post.services'
import {addSection, deleteSection, editSection, getSections} from '@/core/services/sections.services'
import {deletePostImage, getAllImgs, uploadPostImage} from '@/core/services/img.services'
import ServiceStorage from '@/core/lib/service-storage'
import routesObj from '@/app/routes/routes-obj'
import VueRouter from 'vue-router'
import statuses from '@/core/collections/statuses'
import customEditor from '@/app/views/EditPost/extensions/editor/customElements/custom-editor'
import Section from '@/core/models/classes/article/Section'
import {vxc} from '@/core/store/store.vuex'
import Post from '@/core/models/classes/article/Post'
import {Editor} from '@tiptap/vue-2'
import CustomImage from '@/app/views/EditPost/extensions/editor/customElements/custom-img'
import StartKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import {TextAlign} from '@tiptap/extension-text-align'
import {Blockquote} from '@tiptap/extension-blockquote'
import {Underline} from '@tiptap/extension-underline'
import {Link} from '@tiptap/extension-link'
import {Typography} from '@tiptap/extension-typography'
import {TaskList} from '@tiptap/extension-task-list'
import {TaskItem} from '@tiptap/extension-task-item'
import {TextStyle} from '@tiptap/extension-text-style'
import {Dropcursor} from '@tiptap/extension-dropcursor'
import {Placeholder} from '@tiptap/extension-placeholder'
import {getRandomQuotes} from '@/core/lib/editor/editor-quotes'
import {Highlight} from '@tiptap/extension-highlight'
import CustomCodeBlock from '@/app/views/EditPost/extensions/editor/customElements/custom-code'
import {lowlight} from 'lowlight'
import {Mention} from '@tiptap/extension-mention'
import mentionConf from '@/app/views/EditPost/extensions/mention/mention-conf'

Vue.use(Vuex)

const VuexModule = createModule({
    namespaced: 'edit-post',
    strict: false,
})

export class EditPostStore extends VuexModule {
    sections: Section[] = []
    newSection: Section = new Section()
    editSection: Section = new Section()
    post = new Post()
    $router: VueRouter = new VueRouter()
    absolute = true
    domain = this.post.domain
    loading = true
    prevRoute = null
    isNewPost = true
    annImgBlob = new Blob()
    selectedPostImgBlob = new Blob()
    selectedPostImg = ''
    isShowPostImgMenuModal = false
    isShowPostUploadModal = false
    isShowAnnImgMenuModal = false
    isShowAnnUploadModal = false
    isShowNewSectionForm = false
    isShowEditSectionForm = false
    autoSaveTimer: NodeJS.Timer
    messageAutoSave = ''
    rules = []
    editor = new Editor({
        extensions: [
            CustomImage,
            StartKit,
            Document,
            TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
            Blockquote,
            Underline,
            Link,
            Typography,
            TaskList,
            TaskItem,
            TextStyle,
            Dropcursor,
            // ColorHighlighter,
            // SmilieReplacer,
            Placeholder.configure({ placeholder: getRandomQuotes() }),
            Highlight.configure({ multicolor: true }),
            CustomCodeBlock.configure({ lowlight }),
            // @ts-ignore
            Mention.configure(mentionConf),
        ],
        content: this.post.content,
    })

    postImgs: string[] = []

    postCropOpts = { quality: 1, isProportional: false, isCircle: false, maxCropperHeight: 300 }

    annCropOpts = {
        isProportional: false,
        isCircle: false,
        maxCropperHeight: 300,
        quality: 1,
    }

    @mutation setRouter(val: VueRouter) {
        this.$router = val
    }

    @mutation setIsShowNewSectionForm(val = !this.isShowNewSectionForm) {
        this.isShowNewSectionForm = val
        this.isShowEditSectionForm = false
    }

    @mutation setIsShowEditSectionForm(val = !this.isShowEditSectionForm) {
        if (this.editSection.name) {
            this.isShowEditSectionForm = val
            this.isShowNewSectionForm = false
        } else {
            vxc.snackbar.setSnackBarMsg({
                msg: 'Сначала выберите раздел!',
            })
        }
    }

    @mutation setIsShowAnnImgMenuModal(val: boolean) {
        this.isShowAnnImgMenuModal = val
    }

    @mutation setIsShowAnnUploadModal(val: boolean) {
        this.isShowAnnUploadModal = val
    }

    @mutation setIsShowPostImgMenuModal(val: boolean) {
        this.isShowPostImgMenuModal = val
    }

    @mutation setIsShowPostUploadModal(val: boolean) {
        this.isShowPostUploadModal = val
    }

    @mutation setAnnotationText(val: string) {
        this.post.annotation.text = val
    }

    @mutation setTitle(val: string) {
        this.post.title = val
    }

    @mutation setContent(val: string) {
        this.post.content = val
    }

    @mutation setTags(val: string[]) {
        this.post.tags = val
    }

    @mutation showUploadImg() {
        if (this.post.annotation.imgUrl) {
            this.isShowAnnImgMenuModal = true
        } else {
            this.isShowAnnUploadModal = true
        }
    }

    // @mutation dropImg(file: File) {
    //     console.log(file)
    // }

    @mutation setSectionId(val: Section) {
        this.post.sectionId = val.id
        this.editSection = val
    }

    @mutation setDomain(val: string) {
        this.domain = val
    }

    @mutation setPosts(val: Section[]) {
        this.sections = val
    }

    @mutation setNameNewSection(val: string) {
        this.newSection.name = val
    }

    @mutation setDescriptionNewSection(val: string) {
        this.newSection.description = val
    }

    @mutation setNameEditSection(val: string) {
        this.editSection.name = val
    }

    @mutation setDescriptionEditSection(val: string) {
        this.editSection.description = val
    }

    @action
    async applySetDomain() {
        this.post.domain = this.domain

        void this.save().then(() => {
            window.location.host = `${this.domain}.foma-blog.ru`
        })
    }

    get btnClasses() {
        return (btn: any) => {
            if (this.isNewPost) {
                return btn.isErrorNewPost ? 'error ' : btn.isSuccessNewPost ? 'success' : ''
            } else return ''
        }
    }

    @action
    async onShowPreview() {
        this.save().then(() => {
            const routeData = this.$router.resolve({
                name: routesObj.POST.name,
                params: { title: this.post.urlTitle },
            })
            window.open(routeData.href, '_blank')
        })
    }

    @action
    async onPublishAndSave() {
        await this.save()
        await this.changeStatus(statuses.PUBLISHED.value)
        await this.onShowPreview()
    }

    @action getAllImgs() {
        this.loading = true

        return getAllImgs(this.post.id)
            .then((data) => {
                this.postImgs = data
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action
    async getPost(props: { postId: string; title: string }) {
        this.loading = true

        return getPost(props.postId, props.title)
            .then((post) => {
                this.post = post
                this.editor.commands.setContent(this.post.content)

                this.domain = this.post.domain
                this.isNewPost = false
                this.getAllImgs()
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action()
    async addPost() {
        this.loading = true

        return addPost(this.post)
            .then((post) => {
                this.isNewPost = false
                this.post = post
                this.$router.push({ name: routesObj.EDIT_POST.name, params: { title: post.title, postId: post.id } })
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action()
    async changeStatus(status: number) {
        this.loading = true

        return changeStatusPost(this.post.id, status)
            .then((post) => {
                this.post = post
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action()
    async editPost() {
        this.loading = true

        editPost(this.post.id, this.post)
            .then((post) => {
                this.post = post
            })
            .finally(() => {
                this.loading = false
            })
    }

    // @action() async uploadImg(image: File) {
    //     this.loading = true
    //
    //     uploadPostImage(image, this.post)
    //         .then(() => {
    //             // todo res.imagePath
    //         })
    //         .finally(() => {
    //             this.loading = false
    //         })
    // }

    @action
    async saveAnnImg(val: { originalFile: Blob }) {
        this.post.annotation.imgUrl = URL.createObjectURL(val.originalFile)
        this.annImgBlob = val.originalFile

        uploadPostImage(this.annImgBlob, this.post)
            .then((imgUrl) => {
                this.post.annotation.imgUrl = imgUrl
                void this.editPost()
                void this.getAllImgs()
            })
            .catch()
    }

    @action
    async savePostImg(props: { file: { croppedFile: Blob } }) {
        this.selectedPostImg = URL.createObjectURL(props.file.croppedFile)
        this.selectedPostImgBlob = props.file.croppedFile

        uploadPostImage(this.selectedPostImgBlob, this.post)
            .then((imgUrl) => {
                this.editor.chain().focus().setImage({ src: imgUrl }).run()
                this.selectedPostImg = imgUrl
                void this.editPost()
                void this.getAllImgs()
            })
            .catch()
    }

    @action()
    async deleteAnnImg() {
        deletePostImage(this.post.annotation.imgUrl, this.post.id).then(() => {
            this.post.annotation.imgUrl = ''
            void this.editPost()
            void this.getAllImgs()
        })
    }

    @action()
    async deletePostImg(imgUrl: string) {
        deletePostImage(imgUrl, this.post.id).then(() => {
            void this.editPost()
            void this.getAllImgs()
        })
    }

    @action
    async getSections() {
        this.loading = true

        getSections()
            .then((sections) => {
                this.setPosts(sections)
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action()
    async addSection() {
        this.loading = true

        addSection(this.newSection)
            .then((section) => {
                this.sections.push(section)
                this.setIsShowNewSectionForm(false)
                this.setSectionId(section)
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action()
    async updateSection() {
        this.loading = true

        editSection(this.editSection)
            .then((section) => {
                const idx = this.sections.findIndex((s) => s.id === section.id)
                this.sections[idx] = section
                this.setIsShowNewSectionForm(false)
                this.setSectionId(section)
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action()
    async deleteSection() {
        this.loading = true

        deleteSection(this.editSection.id)
            .then(() => {
                this.sections = [...this.sections.filter((s) => s.id !== this.editSection.id)]
                this.editSection = new Section()
                this.setIsShowNewSectionForm(false)
            })
            .finally(() => {
                this.loading = false
            })
    }

    @action()
    async save() {
        ServiceStorage.setProp('editor__post', this.post)

        if (this.isNewPost) {
            return await this.addPost()
        } else {
            return await this.editPost()
        }
    }

    @action()
    async reset($router: VueRouter) {
        this.sections = []
        this.newSection = new Section()
        this.editSection = new Section()
        this.post = new Post()
        this.$router = $router
        this.absolute = true
        this.loading = true
        this.prevRoute = null
        this.isNewPost = true
        this.annImgBlob = new Blob()
        this.selectedPostImgBlob = new Blob()
        this.selectedPostImg = ''
        this.isShowPostImgMenuModal = false
        this.isShowPostUploadModal = false
        this.isShowAnnImgMenuModal = false
        this.isShowAnnUploadModal = false
        this.isShowNewSectionForm = false
        this.isShowEditSectionForm = false
        this.rules = []

        this.postImgs = []
        this.editor = customEditor(this.post.content, (val: string) => this.setContent(val))
    }

    @action
    async autoSave() {
        const offTimer = () => {
            setTimeout(() => {
                this.messageAutoSave = ''
            }, 5000)
        }

        this.autoSaveTimer = setInterval(() => {
            if (!this.isNewPost && getInValidPostFields(this.post).length === 0) {
                if (!this.messageAutoSave) {
                    this.messageAutoSave = '- автосохранение... -'

                    editPost(this.post.id, this.post, false)
                        .then((post) => {
                            this.messageAutoSave = '- автосохранение выполнено успешно -'
                            this.post = post
                        })
                        .catch(() => {
                            this.messageAutoSave = '- автосохранение не выполнено (ошибка) ! -'
                        })
                        .finally(offTimer)
                }
            } else {
                this.messageAutoSave = ' - автосохранение не выполнено (новая статья или не все поля заполнены) - '
                offTimer()
            }
        }, 30000)
    }
}

export default EditPostStore
