import http from '../utils/http.js'

export const reqBannerList = (data, config) => http.get('/index/findBanner', data, config)

export const reqCategoryList = (data, config) => http.get('/index/findCategory1', data, config)

export const reqActiveList = (data, config) => http.get('/index/advertisement', data, config)

export const reqHotList = (data, config) => http.get('/index/findRecommendGoods', data, config)

export const reqGuessList = (data, config) => http.get('/index/findListGoods', data, config)

export const reqIndexData = () => {
  return http.all(reqBannerList(), reqCategoryList(), reqActiveList(), reqGuessList(), reqHotList())
}
