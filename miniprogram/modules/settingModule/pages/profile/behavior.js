import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '../../../../stores/userStore'
export const behavior = BehaviorWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo']
  }
})
