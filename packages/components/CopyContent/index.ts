import './index.less'
import { h, resolveComponent } from 'vue'

export default function copyContent(ctt, width = 120) {
  const copyComp = resolveComponent('a-typography-paragraph')

  const ret = ctt
    ? h(
      'div',
      { class: 'material-url-copy-ctn' },
      h(
        copyComp,
        {
          copyable: true,
        },
        h('span', { class: 'ellipsis material-url', style: { width: `${width}px` } }, ctt)
      )
    )
    : h('span', '空')
  return ret
}
