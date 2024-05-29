//
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { numStore } from '../../stores/number'
import { cloneStore } from '../../stores/cloneStore'
export const behaviorWithStore = BehaviorWithStore({
  //   如果一个页面需要引用多个store 需要将storeBindings改造为数组
  storeBindings: [
    {
      store: numStore,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update']
    },

    {
      // 命名空间
      // fields命名冲突 通过命名空间可以解决
      // actions重名只能通过重命名解决
      // 要访问时 使用cloneStore.numA 访问
      namespace: 'cloneStore',
      store: cloneStore,
      fields: ['numA', 'numB', 'sum'],
      actions: {
        handleUpdate: 'update'
      }
    }
  ]
})
