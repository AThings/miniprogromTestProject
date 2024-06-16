import http from '../../../utils/http'

/**
 * @description 新增收获地址
 * @param {*} data
 * @param {*} config
 */
export const reqAddUserAddress = (data, config) => http.post('/userAddress/save', data, config)

/**
 * @description 获取收获地址列表
 * @param {*} data
 */
export const regGetAddressList = (data) => http.get('/userAddress/findUserAddress', data)

/**
 * @description 查询地址详情
 * @param {*} id
 */
export const reqGetAddressDetail = (id) => http.get(`/userAddress/${id}`)

/**
 * @description 更新地址详情
 * @param {*} data
 */
export const reqUpdateAddress = (data) => http.post('/userAddress/update', data)

/**
 * @description 删除地址
 * @param {*} id
 */
export const reqDeleteAddress = (id) => http.get(`/userAddress/delete/${id}`)
