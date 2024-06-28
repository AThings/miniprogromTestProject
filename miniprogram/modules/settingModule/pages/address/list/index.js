// pages/address/list/index.js
import { reqGetAddressList, reqDeleteAddress } from '../../../api/address'
import { swipeCell } from '@/behaviors/swipeCell'

const app = getApp()
Page({
  behaviors: [swipeCell],
  // 页面的初始数据
  data: {
    addressList: []
  },
  onShow() {
    this.getAddressList()
  },
  onLoad(options) {
    /**
     * 代表是否从订单页面过来
     */
    if (options.fromOrder) {
      this.data.fromOrder = options.fromOrder
    }
  },
  // 去编辑页面
  toEdit(event) {
    const id = event?.currentTarget?.dataset?.id
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/add/index?id=' + id
    })
  },
  getAddressList() {
    reqGetAddressList().then((res) => {
      if (res.code === 200) {
        this.setData({
          addressList: res.data
        })
      }
    })
  },
  //   删除地址
  handleDeleteAddress(event) {
    const id = event?.currentTarget?.dataset?.id
    wx.modal({
      content: '确定要删除该地址吗?'
    }).then((res) => {
      if (!res) return
      reqDeleteAddress(id).then((res) => {
        if (res.code === 200) {
          wx.toast({
            title: '删除成功'
          })
          this.getAddressList()
        }
      })
    })
  },
  /**
   * @description 选择更改地址
   */
  changeAddress(event) {
    if (this.data.fromOrder !== '1') {
      return
    }

    const { addressid } = event.currentTarget.dataset
    if (addressid) {
      const selectAddress = this.data.addressList.find((item) => item.id === addressid)

      app.globalData.address = selectAddress

      wx.navigateBack()
    }
  }
})
