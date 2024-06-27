// pages/cart/component/cart.js
// import { behaviorWithStore } from './behavir'
// Component({
//   behaviors: [behaviorWithStore],
//   // 组件的属性列表
//   properties: {},

//   // 组件的初始数据
//   data: {
//     cartList: [1, 2, 3, 4],
//     emptyDes: '还没有添加商品，快去添加吧～'
//   },

//   // 组件的方法列表
//   methods: {}
// })
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

import { userStore } from '../../stores/userStore'
ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token']
  },

  // 组件的初始数据
  data: {
    cartList: [1, 2, 3, 4],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    onShow() {
      console.log(this.data.token)
    }
  }
})
