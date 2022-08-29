import { vxa } from '@/app/store/store.app'
import config from '../../../config/config'

const getMetaInfo = () => {
    const editST = vxa.edit

    return {
        title: editST.post.title,
        meta: [
            {
                name: 'description',
                content: editST.post.annotation.text,
            },
            { property: 'og:title', content: editST.post.title },
            { property: 'og:site_name', content: config.server.domain + 'foma-blog.ru' },
            { property: 'og:type', content: 'website' },
            { name: 'robots', content: 'index,follow' },
        ],
    }
}
