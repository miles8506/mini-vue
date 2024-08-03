import { h, mount, patch } from './utils/render'

const vNodes = h('div', { class: 'foo', id: 'aaa' }, [
  h('h2', null, '當前count:'),
  h('button', { onClick: () => { console.log('bar'); } }, 'click')
])

mount(vNodes, document.querySelector('#app'))

const newNode = h('div', { class: 'bar' }, [h('h2', null, '當前count:'), h('div', null, 'qqq')])

setTimeout(() => {
  patch(vNodes, newNode)
}, 2000);
