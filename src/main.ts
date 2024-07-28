import { h, mount } from './utils/render'

const vNodes = h('div', { class: 'foo' }, [
  h('h2', null, '當前count:'),
  h('button', { onClick: () => { console.log('bar'); } }, 'click')
])

mount(vNodes, document.querySelector('#app'))
