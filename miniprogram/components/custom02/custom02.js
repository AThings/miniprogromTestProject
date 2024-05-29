// components/custom02/custom02.js
// 如果要在组件中使用计算属性 要在组件中引用componentWithComputed方法
import { ComponentWithComputed } from 'miniprogram-computed'
ComponentWithComputed({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    a: 1,
    b: 2
  },
  //   在使用了componentWithComputed后 新增了 computed以及watch配置项
  computed: {
    total(data) {
      // 计算属性不能使用this
      // 要获取data需要通过形参
      return data.a + data.b
    }
  },
  watch: {
    a: (newVal) => {
      console.log(newVal, 'a')
    },
    b: (newVal) => {
      console.log(newVal, 'b')
    },
    // 同时监听多个数据 数据和数据之间用逗号间隔
    'a, b': (newValA, newValB) => {
      console.log(newValA, newValB)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleUpdate() {
      const { a, b } = this.data
      this.setData({
        a: a + 1,
        b: b + 1
      })
    }
  }
})
