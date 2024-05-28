import http from '../utils/http.js'

/**
 * @description 获取商品分类的数据
 * @param {*} data
 * @param {*} config
 */
export const reqCategoryData = (data, config) => http.get('/index/findCategoryTree', data, config)
