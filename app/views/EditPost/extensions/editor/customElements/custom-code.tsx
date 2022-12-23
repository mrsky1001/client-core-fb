import CodeBlock from '@/app/views/EditPost/extensions/editor/CodeBlock.vue'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

const CustomCodeBlock = CodeBlockLowlight.extend({
    addNodeView() {
        // @ts-ignore
        return VueNodeViewRenderer(CodeBlock)
    },
    addAttributes() {
        console.log('addAttributes')
        return {
            ...(this.parent ? this.parent() : undefined),
            data: {
                default: 'code-block',
                renderHTML: (attributes) => {
                    console.log('renderHTML', attributes)
                    return {
                        data: attributes.data,
                    }
                },
            },
        }
    },
})

export default CustomCodeBlock
