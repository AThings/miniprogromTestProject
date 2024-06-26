// pages/goods/detail/index.js
import { reqGoodsInfo } from '../../api/goods'
Page({
  // 页面的初始数据
  data: {
    goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    // 0代表加入购物车 1代表立即购买
    buyNow: 0
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
    console.log(event.detail)
  },
  onLoad(options) {
    console.log(options)
    this.goodsId = options.goodsId

    this.getGoodDetail()
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
  }
})
