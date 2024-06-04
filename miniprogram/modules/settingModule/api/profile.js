import http from '../../../utils/http'

/**
 * @description 上传本地资源文件
 * @param {*} filePath
 * @param {*} name
 * @param {*} config
 */
export const reqFileUpload = (filePath, name, config) => http.upload('/fileUpload', filePath, name, config)

/**
 * @description 更新用户信息
 * @param {*} data
 * @param {*} config
 */
export const reqUpdateUserInfo = (data, config) => http.post('/weixin/updateUser', data, config)
