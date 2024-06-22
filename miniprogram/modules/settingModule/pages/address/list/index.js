// pages/address/list/index.js
import { reqGetAddressList, reqDeleteAddress } from '../../../api/address'
Page({
  // 页面的初始数据
  data: {
    addressList: []
  },
  onShow() {
    this.getAddressList()
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
  }
})
