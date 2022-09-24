import {Attributes, mergeAttributes, VueNodeViewRenderer} from '@tiptap/vue-2'
import {Image} from '@tiptap/extension-image'
import ImgResizer from '@/app/views/EditPost/extensions/editor/ImgResizer.vue'

const CustomImage = Image.extend({
    name: 'customImage',

    // draggable: true,

    addAttributes() {
        return {
            ...(this.parent ? this.parent() : undefined),
            style: {
                default: '',
                renderHTML: (attributes: Attributes) => {
                    return {
                        style: attributes.style,
                    }
                },
            },
            changeStyle: {
                default: '',
                renderHTML: (attributes: Attributes) => {
                    return {
                        style: attributes.style,
                    }
                },
            },
            //         id: {
            //             default: nanoid(),
            //             renderHTML: (attributes: Attributes) => {
            //                 return {
            //                     id: attributes.id,
            //                 }
            //             },
            //         },
            //         clientWidth: {
            //             default: 0,
            //             renderHTML: (attributes: Attributes) => {
            //                 return {
            //                     clientWidth: attributes.clientWidth,
            //                 }
            //             },
            //         },
            //         clientHeight: {
            //             default: 0,
            //             renderHTML: (attributes: Attributes) => {
            //                 return {
            //                     clientHeight: attributes.clientHeight,
            //                 }
            //             },
            //         },
            //         naturalWidth: {
            //             default: 0,
            //             renderHTML: (attributes: Attributes) => {
            //                 return {
            //                     naturalWidth: attributes.naturalWidth,
            //                 }
            //             },
            //         },
            //         naturalHeight: {
            //             default: 0,
            //             renderHTML: (attributes: Attributes) => {
            //                 return {
            //                     naturalHeight: attributes.naturalHeight,
            //                 }
            //             },
            //         },
            //         // onblur: {
            //         //     // default: `if(this.style.`,
            //         //     default: `
            //         //        this.style.transform='scale(1)';
            //         //        this.style['-webkit-transform']= 'scale(1)';
            //         //        this.style['-moz-transform']= 'scale(1)';
            //         //        this.style['-o-transform']= 'scale(1)';
            //         //   `,
            //         //     renderHTML: (attributes) => {
            //         //         return {
            //         //             onblur: attributes.onblur,
            //         //         }
            //         //     },
            //         // },
            //         // onclick: {
            //         //     default: '',
            //         //     renderHTML: (attributes) => {
            //         //         return {
            //         //             onclick: attributes.onclick,
            //         //         }
            //         //     },
            //         // },
            //         onerror: {
            //             /* eslint-disable prettier/prettier */
            //             default: 'this.style.display=\'none\'',
            //             renderHTML: (attributes: Attributes) => {
            //                 return {
            //                     onerror: attributes.onerror,
            //                 }
            //             },
            //         },
        }
    },

    // @ts-ignore
    // renderHTML({ HTMLAttributes }) {
    //     return ['img', mergeAttributes(HTMLAttributes)]
    // },
    addNodeView() {
        return VueNodeViewRenderer(ImgResizer)
    },
    renderHTML({ HTMLAttributes }: { HTMLAttributes: Attributes }) {
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },
})

export default CustomImage
