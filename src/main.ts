import createApp from './utils/createApp'
import { reactive } from './utils/reactive';
import { h } from './utils/render'

createApp({
  data: reactive({
    count: 0
  }),
  render() {
    return h('div', null, [
      h('h2', null, `count: ${this.data.count}`),
      h('button', {onClick: () => this.data.count++ }, 'click')
    ])
  }
}).mount('#app')
