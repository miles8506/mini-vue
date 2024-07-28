interface VNode {
  tag: string
  props: Record<string, unknown> | null
  children: VNode[] | string | null
  el?: HTMLElement
}

export function h(
  tag: string,
  props: Record<string, unknown> | null,
  children: VNode[] | string | null
) {
  return {
    tag,
    props,
    children
  }
}


export function mount(vNode: VNode, container: HTMLElement) {
  const el = document.createElement(vNode.tag)
  vNode.el = el

  if (vNode.props) {
    Object.keys(vNode.props).forEach(key => {
      const val = vNode.props[key]

      key.startsWith('on') ? 
        el.addEventListener(key.substring(2).toLowerCase(), val as (() => {})) :
        el.setAttribute(key, val as string)
    })
  }

  if (vNode.children) {
    if (typeof vNode.children === 'string') {
      el.textContent = vNode.children
      container.appendChild(el)
    } else {
      for (const child of vNode.children) {
        mount(child, el)
      }
    }
  }

  container.appendChild(el)
}
