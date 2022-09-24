import {Editor} from '@tiptap/vue-2'
import {TextAlign} from '@tiptap/extension-text-align'
import {Blockquote} from '@tiptap/extension-blockquote'
import {Link} from '@tiptap/extension-link'
import {TaskItem} from '@tiptap/extension-task-item'
import {TaskList} from '@tiptap/extension-task-list'
import {Typography} from '@tiptap/extension-typography'
import {Underline} from '@tiptap/extension-underline'
import {TextStyle} from '@tiptap/extension-text-style'
import {Dropcursor} from '@tiptap/extension-dropcursor'
import {Placeholder} from '@tiptap/extension-placeholder'
import CustomCodeBlock from '@/app/views/EditPost/extensions/editor/customElements/custom-code'
import {Highlight} from '@tiptap/extension-highlight'
import {getRandomQuotes} from '@/core/lib/editor/editor-quotes'
import {Mention} from '@tiptap/extension-mention'
import mentionConf from '@/app/views/EditPost/extensions/mention/mention-conf'
import {lowlight} from 'lowlight'
import StartKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import CustomImage from '@/app/views/EditPost/extensions/editor/customElements/custom-img'

const CustomEditor = (content: string, onUpdate: (_val: string) => void = (_val: string) => undefined): Editor => {
    const editor = new Editor({
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
        content: content,
    })

    editor.on('update', ({ editor }) => {
        onUpdate(editor.getHTML())
    })

    return editor
}
export default CustomEditor
