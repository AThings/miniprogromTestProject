// pages/order/list/index.js
import { reqOrderList } from '../../..//api/orderPay'
Page({
  // 页面的初始数据
  data: {
    requestData: {
      page: 1,
      limit: 10
    },
    // 订单列表
    orderList: [],
    // 订单总数
    total: 0,
    isLoading: false
  },
  /**
   * @description 获取帐单列表
   */
  async getOrderList() {
    const { page, limit } = this.data.requestData
    this.data.isLoading = true
    const res = await reqOrderList(page, limit)
    this.data.isLoading = false
    const { code, data } = res
    if (code === 200) {
      this.setData({
        orderList: [...this.data.orderList, ...data.records],
        total: data.total
      })
    }
  },
  //   监听页面上拉操作
  onReachBottom() {
    if (this.data.isLoading) {
      return
    }
    //   判断是否加载完成
    if (this.data.orderList.length === this.data.total) {
      wx.toast({
        title: '数据加载完成'
      })
      return
    }
    this.setData({
      requestData: {
        ...this.data.requestData,
        page: this.data.requestData.page + 1
      }
    })
    this.getOrderList()
  },
  onShow() {
    this.getOrderList()
  }
})
