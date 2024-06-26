// pages/profile/profile.js
import { behavior } from './behavior'
import { reqFileUpload, reqUpdateUserInfo } from '../../api/profile'
import { getStorage, setStorage } from '@/utils/storage'
import { toast } from '@/utils/extendApi'
Page({
  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true,
      'userInfo.nickname': this.data.userInfo.nickname
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  },
  //   更新用户头像
  handleChooseavator(event) {
    // 获取头像临时路径
    const { avatarUrl } = event.detail

    // 将临时路径上传到服务器
    reqFileUpload(avatarUrl, 'file', {
      token: getStorage('token')
    }).then((res) => {
      const { code, data } = res
      if (code === 200) {
        this.setData({
          'userInfo.headimgurl': data
        })
      }
    })
  },
  //   获取昵称
  getNickname(event) {
    const { nickname } = event.detail.value
    this.setData({
      'userInfo.nickname': nickname,
      isShowPopup: false
    })
  },
  //   更新用户信息之前
  beforeSaveUserInfo() {
    this.saveUserInfo()
  },
  //   更新用户信息
  saveUserInfo() {
    reqUpdateUserInfo(this.data.userInfo).then((res) => {
      if (res.code === 200) {
        // 用户信息更新成功后 保存一份到本地以及storage
        setStorage('userInfo', this.data.userInfo)
        this.setUserInfo(this.data.userInfo)

        // 提示
        toast({
          title: '用户信息更新成功'
        })
      }
    })
  },
  behaviors: [behavior]
})
