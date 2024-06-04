import http from '../utils/http'

/**
 * @description 将临时登录凭证传递到后端服务器
 * @param {*} code 临时登录凭证
 */
export const reqLogin = (code) => {
  return http.get(`/weixin/wxLogin/${code}`)
}

/**
 * @description: 获取用户信息
 */
export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}
