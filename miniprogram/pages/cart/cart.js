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

import { userStore } from '@/stores/userStore'

import { reqCartList, reqUpdateChecked } from '@/api/cart'
ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token']
  },

  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    onShow() {
      this.afterPageShow()
    },
    // 页面展示后的逻辑
    afterPageShow() {
      // 判断是否登录
      const { token } = this.data

      if (!token) {
        this.setData({
          emptyDes: '您尚未登录，登录获取更多权益',
          cartList: []
        })
        return
      }

      reqCartList().then((res) => {
        const { code, data: cartList } = res
        if (code === 200) {
          this.setData({
            cartList,
            emptyDes: cartList.length === 0 ? '还没有添加商品，快去添加吧～' : ''
          })
        }
      })
    },
    /**
     * 更新商品选中状态
     */
    handleUpdateChecked(event) {
      const { detail } = event
      const { id, index } = event.target.dataset
      const isChecked = detail ? 1 : 0
      reqUpdateChecked(id, isChecked).then((res) => {
        if (res.code === 200) {
          //   this.afterPageShow()
          this.setData({
            [`cartList[${index}].isChecked`]: isChecked
          })
        }
      })
    }
  }
})
