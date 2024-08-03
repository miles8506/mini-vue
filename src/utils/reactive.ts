import { getDepend } from './depend'
import { TargetType } from '../type'

/** 
 * ES6 Proxy
*/
export function reactive<T extends TargetType>(obj: T): T {
  return new Proxy<T>(obj, {
    get(target, key, receiver) {
      const depend = getDepend(target, key as string)
      depend.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      const val = Reflect.set(target, key, newValue, receiver)
      const depend = getDepend(target, key as string)
      depend.notify()
      return val
    }
  })
}

/** 
 * Support ES5 Object.defineProperty
*/
export function reactiveES5<T extends TargetType>(obj: T): T {
  Object.keys(obj).forEach((key) => {
    let val = obj[key]
    Object.defineProperty<T>(obj, key, {
      get() {
        const depend = getDepend(obj, key)
        depend.depend()
        return val
      },
      set(newValue) {
        val = newValue
        const depend = getDepend(obj, key)
        depend.notify()
      }
    })
  })

  return obj
}
