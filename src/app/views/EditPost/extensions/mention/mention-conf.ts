/*
 * Copyright (©) 09.07.2021, 17:13. Kolyada Nikita Vladimirovich (nikita.nk16@yandex.ru)
 */

import MentionList from '../editor/MentionsList.vue'
import tippy, { Instance } from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-2'

const mentionConf = {
    HTMLAttributes: {
        class: 'mention',
    },
    suggestion: {
        items: (query: string) => {
            return ['mrsky1001', 'n_shurupchic', 'Никита', 'Настя']
                .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
                .slice(0, 5)
        },
        render: () => {
            let component: VueRenderer
            let popup: Instance[]

            return {
                onStart: (props: any) => {
                    component = new VueRenderer(MentionList, {
                        parent: this,
                        propsData: props,
                    })

                    popup = tippy('body', {
                        getReferenceClientRect: props.clientRect,
                        appendTo: () => document.body,
                        content: component.element,
                        showOnCreate: true,
                        interactive: true,
                        trigger: 'manual',
                        placement: 'bottom-start',
                    })
                },
                onUpdate(props: Record<string, any> = {}) {
                    component.updateProps(props)

                    popup[0].setProps({
                        getReferenceClientRect: props.clientRect,
                    })
                },
                onKeyDown(props: Record<string, any> = {}) {
                    // @ts-ignore
                    return component.ref ? component.ref.onKeyDown(props) : undefined
                },
                onExit() {
                    popup[0].destroy()
                    component.destroy()
                },
            }
        },
    },
}

export default mentionConf
