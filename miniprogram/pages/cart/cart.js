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

const computedBehavior = require('miniprogram-computed').behavior
import { swipeCell } from '@/behaviors/swipeCell'

import { cloneDeep } from 'lodash' // 深克隆
import { reqCartList, reqUpdateChecked, reqCheckAllStatus, reqAddCart, reqDelCartGoods } from '@/api/cart'

// 引入防抖方法
import { debounce } from 'miniprogram-licia'

ComponentWithStore({
  behaviors: [computedBehavior, swipeCell],
  storeBindings: {
    store: userStore,
    fields: ['token']
  },

  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  computed: {
    selectAllStatus(data) {
      return data.cartList.length !== 0 && data.cartList.every((item) => item.isChecked === 1)
    },
    totalPrice(data) {
      let totalPrice = 0

      data.cartList.forEach((item) => {
        if (item.isChecked === 1) {
          totalPrice += item.price * item.count
        }
      })
      return totalPrice
    }
  },

  // 组件的方法列表
  methods: {
    onShow() {
      this.afterPageShow()
    },
    onHide() {
      this.closeAllSwipeCell()
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
    },
    /**
     * @description 全选 全不选
     */
    handleUpdateAllStatus(event) {
      const { detail } = event
      const isChecked = detail ? 1 : 0
      reqCheckAllStatus(isChecked).then((res) => {
        if (res.code === 200) {
          //   this.afterPageShow()
          const newCartList = cloneDeep(this.data.cartList)
          newCartList.forEach((item) => (item.isChecked = isChecked))
          this.setData({
            cartList: newCartList
          })
        }
      })
    },
    /**
     * @description 更新物品数量
     */
    changBuyNum: debounce(function (event) {
      const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/

      //   如果数字大于200 重置为200
      const newBuyNum = event.detail > 200 ? 200 : event.detail

      const { id, index } = event.target.dataset
      const oldbuynum = Number(event.target.dataset.oldbuynum)
      //   验证newBuyNow 不合法将数值重置
      if (!reg.test(newBuyNum)) {
        this.setData({
          [`cartList[${index}].count`]: oldbuynum
        })
        return
      }

      //   数量未变 return回去
      if (newBuyNum === oldbuynum) {
        return
      }
      //   合法 计算差值
      const digNum = newBuyNum - oldbuynum

      reqAddCart({
        goodsId: id,
        count: digNum
      }).then((res) => {
        if (res.code === 200) {
          this.setData({
            [`cartList[${index}].count`]: oldbuynum + digNum,
            [`cartList[${index}].isChecked`]: 1
          })
        }
      })
    }, 500),
    /**
     * @description 删除购物车商品
     */
    handleDelGoods(event) {
      wx.modal({
        content: '确定要删除该商品吗？'
      }).then((res) => {
        if (res) {
          const { id, index } = event.target.dataset
          reqDelCartGoods(id).then((res) => {
            if (res.code === 200) {
              wx.toast({
                title: '删除成功'
              })
              const newCartList = this.data.cartList
              newCartList.splice(index, 1)
              this.setData({
                cartList: newCartList
              })
            }
          })
        }
      })
    },
    /**
     * @description 跳转到订单结算页面
     */
    toOrder() {
      // 判断是否勾选了商品 没有勾选就不跳转
      if (this.data.totalPrice === 0) {
        wx.toast({
          title: '请选择商品'
        })
        return
      }

      wx.navigateTo({
        url: '/modules/orderPayModule/pages/order/detail/detail'
      })
    }
  }
})
