import { reqOrderAddress, reqOrderInfo, reqBuyNowGoods, reqSubmitOrder } from '@/api/orderPay'

// 格式化时间方法
import { formatTime } from '@/utils/formatTime'

import Schema from 'async-validator'
const app = getApp()
Page({
  data: {
    buyName: '', // 订购人姓名
    buyPhone: '', // 订购人手机号
    deliveryDate: '', // 期望送达日期
    blessing: '', // 祝福语
    show: false, // 期望送达日期弹框
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    // 收货地址
    orderAddress: {},
    // 订单信息
    orderInfo: {},
    // 订单总价
    totalAmount: 0,
    // 商品列表
    cartVoList: []
  },

  // 选择期望送达日期
  onShowDateTimerPopUp() {
    this.setData({
      show: true
    })
  },

  // 期望送达日期确定按钮
  onConfirmTimerPicker(event) {
    const deliveryDate = formatTime(new Date(event.detail))
    this.setData({
      show: false,
      deliveryDate
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
    reqOrderAddress().then((res) => {
      const { code, data } = res
      if (code === 200) {
        this.setData({
          orderAddress: data
        })
      }
    })
  },
  /**
   * @description 获取订单详细信息
   */
  getOrderInfo() {
    if (this.data.options && this.data.options.goodsId) {
      // 代表通过点击立即购买进入的订单页面 要调用其他接口
      reqBuyNowGoods({ ...this.data.options }).then((res) => {
        this.setOrderInfo(res)
      })
      return
    }
    reqOrderInfo().then((res) => {
      this.setOrderInfo(res)
    })
  },
  /**
   * @description 获取订单信息后 设定页面数据
   * @param {} res
   */
  setOrderInfo(res) {
    const { code, data } = res
    if (code === 200) {
      const { totalAmount, cartVoList } = data

      // 判断是否存在祝福语
      // 多个时 选择第一个祝福语进行赋值
      let blessing = ''
      for (let i = 0; i < cartVoList.length; i++) {
        const item = cartVoList[i]
        if (item.blessing) {
          blessing = item.blessing
          break
        }
      }

      this.setData({
        orderInfo: data,
        totalAmount,
        cartVoList,
        blessing
      })
    }
  },
  /**
   * @description 处理提交订单
   */
  submitOrder() {
    const { buyName, buyPhone, deliveryDate, blessing, orderAddress, orderInfo } = this.data

    const params = {
      buyName,
      buyPhone,
      cartList: orderInfo.cartList,
      deliveryDate,
      remarke: blessing,
      userAddressId: orderAddress.id
    }

    this.handleValidtor(params).then(({ valid }) => {
      if (valid) {
        //   创建平台订单
        reqSubmitOrder(params).then((res) => {
          // 创建成功后 将订单编号挂载到前端页面
          if (res.code === 200) {
            this.orderNo = res.data
          }
        })
      }
    })
  },
  //   表单验证
  handleValidtor(data) {
    //   订单人正则
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'
    // 电话号码正则
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    const rules = {
      buyName: [
        {
          required: true,
          message: '请输入订单人姓名'
        },
        {
          pattern: nameRegExp,
          message: '订单人姓名不合法'
        }
      ],
      buyPhone: [
        {
          required: true,
          message: '请输入订单人手机号'
        },
        {
          pattern: phoneReg,
          message: '订单人手机号码不合法'
        }
      ],
      deliveryDate: [
        {
          required: true,
          message: '请选择送达日期'
        }
      ],
      userAddressId: [
        {
          required: true,
          message: '请选择收货地址'
        }
      ]
    }
    const validator = new Schema(rules)
    return new Promise((reslove, reject) => {
      // 验证的实例方法
      // 第一个参数 要验证的数据 第二个参数 回调参数
      validator.validate(data, (errors, fields) => {
        // errors 验证成功时 erroes是null 失败时是一个错误信息数组

        // fileds 是一个对象 key是验证失败的属性 value是验证失败的规则的数组
        if (errors) {
          wx.toast({
            title: errors[0].message
          })
          reslove({ valid: false })
        } else {
          reslove({ valid: true })
        }
      })
    })
  },
  onShow() {
    this.getAddress()

    this.getOrderInfo()
  },
  onLoad(options) {
    if (options.goodsId) {
      this.data.options = options
    }
  },
  onUnload() {
    //   页面卸载时 删除全局对象的地址
    app.globalData.address = {}
  }
})
