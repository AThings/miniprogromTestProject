// 引入核心类
const QQMapWX = require('../../../../../libs/qqmap-wx-jssdk.min.js')

import Schema from 'async-validator'
Page({
  // 页面的初始数据
  data: {
    // 收货人
    name: '',
    // 手机号码
    phone: '',
    // 省
    provinceName: '',
    // 省编码
    provinceCode: '',
    // 市
    cityName: '',
    // 市编码
    cityCode: '',
    // 区
    districtName: '',
    // 区编码
    districtCode: '',
    // 详细地址
    address: '',
    // 完整地址
    fullAddress: '',
    // 是否默认 0不是默认地址 1是默认地址
    isDefault: 0,
    // 是否默认用于绑定的属性
    isDefaultBoolean: false
  },

  onLoad() {
    //   实例化
    this.qqmapsdk = new QQMapWX({
      // 自己申请的key
      key: 'NXVBZ-KV4RJ-EMNF5-XSCVI-UVV2O-CLF76'
    })
  },
  // 保存收货地址
  saveAddrssForm(event) {
    const { provinceName, cityName, districtName, address } = this.data
    const params = {
      ...this.data,
      fullAddress: provinceName + cityName + districtName + address,
      isDefault: this.data.isDefaultBoolean ? 1 : 0
    }

    this.validatorParams(params)
  },
  //   验证参数
  validatorParams(params) {
    this.handleValidator(params)
      .then((valid) => {
        if (!valid) return
        console.log(params, '成功')
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  },

  // 省市区选择
  onAddressChange(event) {
    const { code, value } = event.detail
    const [provinceCode, cityCode, districtCode] = code
    const [provinceName, cityName, districtName] = value

    this.setData({
      provinceName,
      provinceCode,
      cityName,
      cityCode,
      districtName,
      districtCode
    })
  },
  //   获取用户地理信息
  async onLocation() {
    //   获取用户的所有授权信息
    // 只包含所有已经请求的信息
    // 已授权 true 拒绝授权 false 没有请求 undefined
    const { authSetting } = await wx.getSetting()
    const scopeUserLocation = authSetting['scope.userLocation']

    if (scopeUserLocation === false) {
      //   用户已经拒绝过授权

      const modalRes = await wx.modal({
        title: '授权提示',
        content: '需要获取地理位置信息，请确认是否授权'
      })
      if (modalRes) {
        //   允许授权

        // 手动打开授权页面
        const { authSetting } = await wx.openSetting()
        if (authSetting['scope.userLocation']) {
          this.handleGetUserLocation()
        } else {
          wx.toast({
            title: '授权失败'
          })
        }
      } else {
        //   拒绝授权
        wx.toast({
          title: '您已拒绝授权获取地理位置'
        })
      }
    } else {
      // 已经同意授权 或 没有请求授权
      this.handleGetUserLocation()
    }

    // 在地图中选择地址
    // const ress = await wx.chooseLocation()
    // console.log(ress, 'ress')
  },
  async handleGetUserLocation() {
    // 请求授权
    try {
      //   获取经纬度
      // 用户拒绝授权之后 不会在再弹出授权弹窗
      const res = await wx.getLocation()
      console.log(res, 'res')
    } catch (error) {
      wx.toast({
        title: '您已拒绝授权获取地理位置'
      })
    }
  },
  //   使用chooseLocation来获取地址
  handleUserChooseLocation() {
    wx.chooseLocation().then((res) => {
      console.log(res, 'chooseLocation')

      //   纬度 经度 搜索的地点
      const { latitude, longitude, name } = res
      //   使用 reverseGeocoder 方法进行逆地址解析
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude,
          longitude
        },
        success: (res) => {
          console.log(res, 'reverseGeocoder')
          //   获取省市区编码、省、市、区
          const { adcode, province, city, district } = res.result.ad_info

          //   获取街道门牌(可能为空)
          const { street, street_number } = res.result.address_component

          //   获取标准地址
          const { standard_address } = res.result.formatted_addresses
          this.setData({
            provinceName: province,
            provinceCode: adcode.substring(0, 2) + '0000',
            cityName: city,
            cityCode: adcode.substring(0, 4) + '00',
            districtName: district,
            districtCode: district && adcode,
            address: street + street_number + name,
            fullAddress: standard_address + name
          })
        },
        complete: (complete) => {
          console.log(complete, 'complete')
        }
      })
    })
  },
  //   表单验证
  handleValidator(data) {
    //   收货人正则
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'
    // 电话号码正则
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    //   定义验证规则
    const rules = {
      // key 验证规则的名字 和验证的数据保持一致
      name: [
        {
          required: true,
          message: '收货人姓名不能为空'
        },
        {
          pattern: nameRegExp,
          message: '收货人姓名不合法'
        }
        // 正则验证
        // {
        //   pattern: '',
        //   message: ''
        // }
        // 自定义验证规则
        // {
        //   validator: () => {}
        // }
      ],
      phone: [
        {
          required: true,
          message: '收货人手机号码不能为空'
        },
        {
          pattern: phoneReg,
          message: '收货人手机号码不合法'
        }
      ],
      provinceName: {
        required: true,
        message: '请输入所在地区'
      },
      address: {
        required: true,
        message: '请输入详细地址'
      }
    }
    //   传入规则对构造函数实例化
    const validInstance = new Schema(rules)

    return new Promise((reslove, reject) => {
      // 验证的实例方法
      // 第一个参数 要验证的数据 第二个参数 回调参数
      validInstance.validate(data, (errors, fields) => {
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
  }
})
