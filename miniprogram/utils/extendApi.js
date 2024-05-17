/**
 * 消息提示框
 * @param {*} param0 和wxwx.showToast一致
 */
export const toast = ({ title = '数据加载中...', icon = 'none', duration = 2000, mask = true } = {}) => {
  wx.showToast({
    title,
    icon,
    duration,
    mask
  })
}
/**
 * @description 模态对话框
 * @param {*} option 和wx.showModel一致
 */
export const model = (option = {}) => {
  return new Promise((resolve) => {
    const defaultOptions = {
      title: '提示',
      content: '确定要执行该操作吗？',
      confirmColor: '#f1514f'
    }

    const options = Object.assign({}, defaultOptions, option)
    wx.showModal({
      ...options,
      complete: (res) => {
        if (res.cancel) {
          resolve(false)
        }

        if (res.confirm) {
          resolve(true)
        }
      }
    })
  })
}
wx.toast = toast
wx.model = model
