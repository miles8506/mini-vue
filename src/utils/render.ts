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

      if (key.startsWith('on')) {
        el.addEventListener(key.substring(2).toLowerCase(), val as (() => {}))
      } else {
        el.setAttribute(key, val as string)
      }
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

export function patch(n1: VNode, n2: VNode) {
  const el = n2.el = n1.el
  // tag
  if (n1.tag !== n2.tag) {
    const parentEl = n1.el.parentElement
    parentEl.removeChild(n1.el)
    mount(n2, parentEl)
  }

  // props
  const oldProps = n1.props ?? {}
  const newProps = n2.props ?? {}
  for (const key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      if (key.startsWith('on')) {
        el.addEventListener(key.substring(2).toLowerCase(), newProps[key] as (() => {}))
      } else {
        el.setAttribute(key, newProps[key] as string)
      }
    }
  }

  for (const key in oldProps) {
    if (!(key in newProps)) {
      if (key.startsWith('on')) {
        el.removeEventListener(key.substring(2).toLowerCase(), newProps[key] as (() => {}))
      } else {
        el.removeAttribute(key)
      }
    }
  }

  // children
}
