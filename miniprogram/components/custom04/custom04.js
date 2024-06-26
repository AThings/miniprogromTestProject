// components/custom04/custom04.js
// 在使用componentWithComputed 中使用store
import { ComponentWithComputed } from 'miniprogram-computed'

// 使用componentWithStore 旧版方法
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { numStore } from '../../stores/number'

ComponentWithComputed({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: numStore,
    fields: ['numA', 'numB', 'sum'],
    actions: ['update']
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    a: 2,
    b: 3
  },

  computed: {
    total: (data) => {
      return data.a + data.b
    }
  },

  watch: {
    'a,b': (newValA, newValB) => {
      console.log(newValA, newValB, 'a,b')
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
      this.update()
    }
  }
})
