// pages/login/login.js
import { toast } from '../../utils/extendApi'
import { reqLogin, reqUserInfo } from '../../api/user'
import { setStorage } from '../../utils/storage'

import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '../../stores/userStore'
ComponentWithStore({
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },
  methods: {
    // 进行授权登录
    login() {
      //   获取临时登录凭证
      wx.login({
        success: ({ code }) => {
          if (code) {
            // 将临时code传递给开发者服务器
            reqLogin(code).then((res) => {
              const token = res?.data?.token
              if (token) {
                setStorage('token', token)
                this.setToken(token)

                // 获取用户信息
                this.getUserInfo()
                // 返回上一级页面
                wx.navigateBack()
              }
            })
          } else {
            toast({
              title: '授权失败请重新授权'
            })
          }
        }
      })
    },
    // 获取用户信息
    getUserInfo() {
      reqUserInfo().then((res) => {
        const { data } = res
        setStorage('userInfo', data)

        // 保存userInfo到store中
        this.setUserInfo(data)
      })
    }
  }
})
