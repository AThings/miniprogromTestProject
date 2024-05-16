// 通过类来封装 会使代码更具有复用性 更方便添加新属性和方法

class WxRequest {
  defaults = {
    // 请求基准地址
    baseURL: '',
    // 接口的请求地址
    url: '',
    // 请求参数
    data: null,
    // 默认的请求方法
    methods: 'GET',
    // 请求头
    header: {
      // 设置数据的交互格式
      'Content-type': 'application/json'
    },
    // 默认的超时时长 小程序默认的超时时长是1分钟
    timeout: 60000
  }
  constructor(params = {}) {
    this.defaults = Object.assign({}, this.defaults, params)
  }

  // 参数同 wx.request
  request(options) {
    return new Promise((resolve, reject) => {
      options.url = this.defaults.baseURL + options.url
      wx.request({
        ...this.defaults,
        ...options,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  //  get便捷方法
  get(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      methods: 'GET'
    })
  }

  //  delete便捷方法
  delete(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      methods: 'DELETE'
    })
  }

  //  put便捷方法
  put(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      methods: 'PUT'
    })
  }

  //  post便捷方法
  post(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      methods: 'POST'
    })
  }
}

const instance = new WxRequest({
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  timeout: 15000
})

export default instance
