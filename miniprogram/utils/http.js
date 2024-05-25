// WxRequest 实例
import WxRequest from './request'
import { getStorage, clearStorage } from './storage'
import { model, toast } from './extendApi'
import { env } from './env'

const instance = new WxRequest({
  baseURL: env.baseURL,
  timeout: 15000
})

instance.interceptors.request = (config) => {
  console.log('实例的请求拦截器')

  //   判断token
  const token = getStorage('token')
  if (token) {
    config.header['token'] = token
  }

  return config
}

instance.interceptors.response = async (response) => {
  const { isSuccess, data } = response
  console.log('实例的响应拦截器', response)
  if (!isSuccess) {
    wx.showToast({
      title: '网络异常请重试',
      icon: 'error'
    })
    return response
  }

  //  判断服务器响应状态码
  switch (data.code) {
    // 200 请求成功
    case 200:
      return data
    // 208 没有token或token失效 需要重新登录
    case 208:
      const res = await model({
        content: '鉴权失败，请重新登陆',
        showCancel: false
      })

      if (res) {
        //   清楚失效的token
        clearStorage()

        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
      return Promise.reject(response)

    default:
      toast({
        title: '程序出现异常，请联系管理员'
      })
      return Promise.reject(response)
  }
}

export default instance
