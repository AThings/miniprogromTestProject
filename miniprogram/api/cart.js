import http from '@/utils/http'

/**
 * @description { 商品详情加入购物车 } 及 { 购物车更新商品数量 }
 * @param { Object } param { goodsId: 商品ID, count 购买数量, blessing 祝福语 }
 */
export const reqAddCart = ({ goodsId, count, ...data }) => {
  return http.get(`/cart/addToCart/${goodsId}/${count}`, data)
}

/**
 * @description 获取购物车列表数据
 * @returns Promise
 */
export const reqCartList = () => {
  return http.get('/cart/getCartList')
}

/**
 * @description 更新商品的选中状态
 * @param {*} goodsId 商品Id
 * @param {*} isChecked 商品的勾选状态，0 说明需要取消勾选， 1 需要勾选
 */
export const reqUpdateChecked = (goodsId, isChecked) => {
  return http.get(`/cart/checkCart/${goodsId}/${isChecked}`)
}

/**
 * @description 实现全选与全不选功能
 * @param {*} isCHecked 全选与全不选状态， 0 取消全选 1 进行全选
 * @return Promise
 */
export const reqCheckAllStatus = (isChecked) => {
  return http.get(`/cart/checkAllCart/${isChecked}`)
}

/**
 * @description 删除购物车商品
 * @param {*} goodsId  商品Id
 * @returns Promise
 */
export const reqDelCartGoods = (goodsId) => {
  return http.get(`/cart/delete/${goodsId}`)
}
