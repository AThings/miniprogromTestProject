import { reqIndexData } from '../../api/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //   轮播图数据
    bannerList: [],
    //   商品导航数据
    categoryList: [],
    // 活动渲染区域
    activeList: [],
    // 人气推荐
    hotList: [],
    // 猜你喜欢
    guessList: [],
    // 是否显示骨架屏
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'url'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    reqIndexData().then((resArr) => {
      //   console.log(resArr)
      const dataList = resArr.map((item) => item.data)
      this.setData({
        bannerList: dataList[0],
        categoryList: dataList[1],
        activeList: dataList[2],
        hotList: dataList[3],
        guessList: dataList[4],
        loading: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
