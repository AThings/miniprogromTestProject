// pages/goods/detail/index.js
import { reqGoodsInfo } from '../../api/goods'

import { userBehavior } from '@/behaviors/userBehavior'
import { reqAddCart, reqCartList } from '@/api/cart'
Page({
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    // 0代表加入购物车 1代表立即购买
    buyNow: 0,
    allCount: ''
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true,
      buyNow: 0
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true,
      buyNow: 1
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    this.setData({
      count: Number(event.detail)
    })
  },
  onLoad(options) {
    this.goodsId = options.goodsId

    this.getGoodDetail()

    this.getCartCount()
  },
  //   查询商品详情
  getGoodDetail() {
    reqGoodsInfo(this.goodsId).then((res) => {
      const { data } = res
      this.setData({
        goodsInfo: data
      })
    })
  },
  //   全屏预览图片
  handlePreviewImage() {
    wx.previewImage({
      urls: this.data.goodsInfo.detailList
    })
  },
  //  加入购物车 立即购买点击确定
  handleSubmitOrder() {
    const { token, count, blessing, buyNow } = this.data
    const goodsId = this.goodsId

    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }

    if (buyNow === 0) {
      reqAddCart({
        goodsId,
        count,
        blessing
      }).then((res) => {
        if (res.code === 200) {
          wx.toast({
            title: '加入购物车成功'
          })

          this.getCartCount()

          this.onClose()
        }
      })
    } else {
      wx.navigateTo({
        url: `/modules/orderPayModule/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`
      })
    }
  },
  //   获取购物车数量
  getCartCount() {
    //   判断是否登录
    if (!this.data.token) return
    reqCartList().then((res) => {
      if (res.data && res.data.length !== 0) {
        let allCount = 0
        allCount = res.data.reduce((total, item) => total + item.count, 0)

        this.setData({
          allCount: allCount > 99 ? '99+' : allCount.toString()
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //   自定义信息
    return {
      title: '所有的砰然心动都是你',
      path: '/page/index/index',
      imageUrl: '../../../../assets/images/love.jpg'
    }
  },
  //   分享到朋友圈
  onShareTimeline() {}
})
