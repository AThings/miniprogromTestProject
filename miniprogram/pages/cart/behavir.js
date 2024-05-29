//
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { numStore } from '../../stores/number'
export const behaviorWithStore = BehaviorWithStore({
  storeBindings: {
    store: numStore,
    fields: ['numA', 'numB', 'sum'],
    actions: ['update']
  }
})
