// 通过类来封装 会使代码更具有复用性 更方便添加新属性和方法

class WxRequest {
  // 实例属性 默认请求参数
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

  // 定义拦截器对象
  interceptors = {
    // 请求拦截器
    // 请求发送之前 对请求参数进行新增修改
    request: (config) => config,
    // 响应拦截器
    // 服务器响应数据后 对服务器响应的数据进行处理
    response: (response) => response
  }

  constructor(params = {}) {
    this.defaults = Object.assign({}, this.defaults, params)
  }

  // 参数同 wx.request
  request(options) {
    options.url = this.defaults.baseURL + options.url

    // 合并请求参数
    options = {
      ...this.defaults,
      ...options
    }
    // 请求拦截器
    options = this.interceptors.request(options)

    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        success: (res) => {
          const mergeRes = Object.assign({}, res, { config: options, isSuccess: true })
          resolve(this.interceptors.response(mergeRes))
        },
        fail: (err) => {
          const mergeErr = Object.assign({}, err, { config: options, isSuccess: false })
          reject(this.interceptors.response(mergeErr))
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

instance.interceptors.request = (config) => {
  console.log('实例的请求拦截器')
  return config
}

instance.interceptors.response = (response) => {
  const { isSuccess, data } = response
  console.log('实例的响应拦截器', response)
  if (!isSuccess) {
    wx.showToast({
      title: '网络异常请重试',
      icon: 'error'
    })
    return response
  }
  return data
}

export default instance
