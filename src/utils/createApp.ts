import { watchEffect } from "./depend"
import { VNode, mount, patch } from "./render"

interface IRootComponent {
  data: Record<string, unknown>,
  render: () => VNode
}

export default function createApp(root: IRootComponent) {
  let isMount = false
  let oldVNode: VNode

  return {
    mount(selectors: string) {
      watchEffect(() => {
        if (!isMount) {
          oldVNode = root.render()
          mount(oldVNode, document.querySelector(selectors))
          isMount = true
        } else {
          const newVNode = root.render()
          patch(oldVNode, newVNode)
          oldVNode = newVNode
        }
      })
    }
  }
}
