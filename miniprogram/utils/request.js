// 通过类来封装 会使代码更具有复用性 更方便添加新属性和方法

export default class WxRequest {
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
    timeout: 60000,
    // 是否显示默认loading
    isLoading: true
  }

  //  请求计数
  requestCount = []

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
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.requestCount++

    options.url = this.defaults.baseURL + options.url

    // 合并请求参数
    options = {
      ...this.defaults,
      ...options
    }

    // 请求拦截器
    options = this.interceptors.request(options)

    // options.isLoading && options.method !== 'UPLOAD'
    if (options.isLoading) {
      // 启用加载效果
      this.requestCount === 1 &&
        wx.showLoading({
          title: 'title',
          mask: true
        })
    }
    console.log(options, 'options')
    return new Promise((resolve, reject) => {
      if (options.method === 'UPLOAD') {
        wx.uploadFile({
          ...options,
          success: (res) => {
            //  将服务器数据进行转换
            res.data = JSON.parse(res.data)
            const mergeRes = Object.assign({}, res, { config: options, isSuccess: true })
            resolve(this.interceptors.response(mergeRes))
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, { config: options, isSuccess: false })
            reject(this.interceptors.response(mergeErr))
          }
        })
      } else {
        wx.request({
          ...options,
          success: (res) => {
            const mergeRes = Object.assign({}, res, { config: options, isSuccess: true })
            resolve(this.interceptors.response(mergeRes))
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, { config: options, isSuccess: false })
            reject(this.interceptors.response(mergeErr))
          },
          complete: () => {
            if (options.isLoading) {
              this.requestCount--

              this.requestCount === 0 && this.requestCount++
              this.timer = setTimeout(() => {
                //   由于request方法中 一开始会调用clearTimeout 下面的代码只有当要关闭loading的时候才会执行 所以只会执行一次
                this.requestCount--
                this.requestCount === 0 && wx.hideLoading()
                clearTimeout(this.timer)
              }, 1)
            }
          }
        })
      }
    })
  }

  //  get便捷方法
  get(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      method: 'GET'
    })
  }

  //  delete便捷方法
  delete(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      method: 'DELETE'
    })
  }

  //  put便捷方法
  put(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      method: 'PUT'
    })
  }

  //  post便捷方法
  post(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config,
      method: 'POST'
    })
  }
  //  upload实例方法 对wx.upload的封装
  upload(url, filePath, name = 'file', config = {}) {
    //   wx.upload 含自带loading 所以默认isloading为false
    return this.request(Object.assign({ url, filePath, name, method: 'UPLOAD', isLoading: false }, config))
  }

  // 处理并发请求 为了代码内风格统一
  all(...promise) {
    return Promise.all(promise)
  }
}
