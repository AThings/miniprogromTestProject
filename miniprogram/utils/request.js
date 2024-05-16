// 通过类来封装 会使代码更具有复用性 更方便添加新属性和方法

class WxRequest {
  constructor() {}

  // 参数同 wx.request
  request(options) {
    return new Promise((resolve, reject) => {
      wx.request({
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
}

const instance = new WxRequest()

export default instance
