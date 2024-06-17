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

  // 保存收货地址
  saveAddrssForm(event) {
    const { provinceName, cityName, districtName, address } = this.data
    const params = {
      ...this.data,
      fullAddress: provinceName + cityName + districtName + address,
      isDefault: this.data.isDefaultBoolean ? 1 : 0
    }
    this.setData({
      isDefault: this.data.isDefaultBoolean ? 1 : 0,
      fullAddress
    })
    console.log(params)
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
  }
})
