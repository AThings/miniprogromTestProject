// observable 用于创建一个被检测的对象，对象的属性是应用的状态，状态会被自动转换为响应式数据
// action 函数是用来显式的定义action方法，action方法是用来修改更新状态
import { observable, action } from 'mobx-miniprogram'

// 定义store对象
export const numStore = observable({
  numA: 1,
  numB: 2,

  // 定义action方法
  update: action(function () {
    this.numA += 1
    this.numB += 1
  }),
  //   计算属性
  get sum() {
    return this.numA + this.numB
  }
})
