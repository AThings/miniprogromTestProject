/**
 * @description 存储数据
 * @param {*} key 本地缓存的key
 * @param {*} data 缓存的数据
 */
export const setStorage = (key, data) => {
  try {
    wx.setStorageSync(key, data)
  } catch (error) {
    console.log(`存储指定 ${key} 数据发生了异常`, error)
  }
}
/**
 * @description 读取数据
 * @param {*} key 本地缓存的key
 */
export const getStorage = (key) => {
  try {
    return wx.getStorageSync(key)
  } catch (error) {
    console.log(`读取指定 ${key} 数据发生了异常`, error)
  }
}
/**
 * @description 删除指定数据
 * @param {*} key 本地缓存的key
 */
export const removeStorage = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch (error) {
    console.log(`删除指定 ${key} 数据发生了异常`, error)
  }
}
/**
 * @description 清空storage
 */
export const clearStorage = () => {
  try {
    wx.clearStorage()
  } catch (error) {
    console.log(`清空Storage数据发生了异常`, error)
  }
}
/**
 * 异步读取Storage
 * @param {*} key 本地存储的key
 * @param {*} data 本地存储的数据
 */
export const asyncSetStorage = (key, data, encrypt = false) => {
  return new Promise((resolve) => {
    wx.setStorage({
      key,
      data,
      encrypt,
      complete: (res) => {
        resolve(res)
      }
    })
  })
}
/**
 * @description 异步读取Storage
 * @param {*} key 本地key
 * @param {*} encrypt
 */
export const asyncGetStorage = (key, encrypt = false) => {
  return new Promise((resolve) => {
    wx.getStorage({
      key,
      encrypt,
      complete: (res) => {
        resolve(res)
      }
    })
  })
}
/**
 * @description 异步移除storage
 * @param {*} key 本地存储key
 */
export const asyncRemoveStorage = (key) => {
  return new Promise((resolve) => {
    wx.removeStorage({
      key,
      complete: (res) => {
        resolve(res)
      }
    })
  })
}
/**
 * 异步移除所有数据
 */
export const asyncClearStorage = () => {
  return new Promise((resolve) => {
    wx.clearStorage({
      complete: (res) => {
        resolve(res)
      }
    })
  })
}
