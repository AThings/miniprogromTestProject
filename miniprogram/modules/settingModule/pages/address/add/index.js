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
  async onShow() {
    const a = await wx.getSetting()
    console.log(a, 'a')
  }
})
