// pages/goods/list/index.js
import { reqGoodsList } from '../../api/goods'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    // 商品总条数
    total: 0,
    isFinish: false, // 判断数据是否加载完毕
    // 节流阀 判断reqGoodsList接口是否请求完成
    isLoading: false,
    // 商品列表参数
    requestData: {
      // 页码
      page: 1,
      // 每页请求条数
      limit: 10,
      // 一级分类ID
      category1Id: '',
      // 二级分类ID
      category2Id: ''
    }
  },
  onLoad(options) {
    Object.assign(this.data.requestData, options)
    this.getGoodList()
  },
  //   获取商品列表数据
  getGoodList() {
    this.data.isLoading = true
    reqGoodsList(this.data.requestData).then((res) => {
      this.data.isLoading = false
      const { data } = res
      this.setData({
        goodsList: [...this.data.goodsList, ...data.records],
        total: data.total
      })
    })
  },
  //   监听页面下拉操作
  onPullDownRefresh() {
    //   重置参数
    this.setData({
      goodsList: [],
      total: 0,
      isFinish: false,
      requestData: {
        ...this.data.requestData,
        page: 1
      }
    })
    // 请求接口
    this.getGoodList()
    // 主动关闭下拉效果
    wx.stopPullDownRefresh()
  },
  //   监听页面上拉操作
  onReachBottom() {
    const { goodsList, total, requestData, isLoading } = this.data
    const { page } = requestData

    // 判断接口是否请求中
    if (isLoading) {
      console.log('here')
      return
    }
    // 判断是否加载完成
    if (goodsList.length === total) {
      this.setData({
        isFinish: true
      })

      return
    }

    // 页码加1
    this.setData({
      requestData: {
        ...this.data.requestData,
        page: page + 1
      }
    })

    // 重新获取列表页面
    this.getGoodList()
  }
})
