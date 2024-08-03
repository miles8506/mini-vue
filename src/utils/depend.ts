import { TargetType } from '../type'

let activeFn: null | (() => void) = null
const targetMap = new WeakMap<TargetType, Map<string, Depend>>()

class Depend {
  reactiveFns: Set<() => void>

  constructor() {
    this.reactiveFns = new Set()
  }

  depend() {
    if (activeFn) this.reactiveFns.add(activeFn)
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

function watchEffect(fn: () => void) {
  activeFn = fn
  fn()
  activeFn = null
}

function getDepend<T extends TargetType>(target: T, key: string) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key as string)
  if (!depend) {
    depend = new Depend()
    map.set(key as string, depend)
  }

  return depend
}

export {
  Depend,
  activeFn,
  watchEffect,
  getDepend,
  targetMap
}
