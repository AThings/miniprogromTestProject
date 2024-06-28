import { reqOrderAddress } from '@/api/orderPay'
const app = getApp()
Page({
  data: {
    buyName: '', // 订购人姓名
    buyPhone: '', // 订购人手机号
    deliveryDate: '选择送达日期', // 期望送达日期
    blessing: '', // 祝福语
    show: false, // 期望送达日期弹框
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    // 收货地址
    orderAddress: {}
  },

  // 选择期望送达日期
  onShowDateTimerPopUp() {
    this.setData({
      show: true
    })
  },

  // 期望送达日期确定按钮
  onConfirmTimerPicker(event) {
    this.setData({
      show: false
    })
  },

  // 期望送达日期取消按钮 以及 关闭弹框时触发
  onCancelTimePicker() {
    this.setData({
      show: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime()
    })
  },

  // 跳转到收货地址
  toAddress() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/list/index'
    })
  },
  //   获取收货地址
  getAddress() {
    reqOrderAddress().then((res) => {
      const { code, data } = res
      if (code === 200) {
        this.setData({
          orderAddress: data
        })
      }
    })
  },
  onShow() {
    /**
     * 获取全局对象中存不存在addres 存在则使用该地址
     */
    if (app.globalData.address.id) {
      this.setData({
        orderAddress: app.globalData.address
      })
      return
    }

    // 不存在时通过接口获取
    this.getAddress()
  },
  onUnload() {
    //   页面卸载时 删除全局对象的地址
    app.globalData.address = {}
  }
})
