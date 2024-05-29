// components/goods-card/custom03.js
// 在compoentWithStore 中兼容 miniprogram-computed
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

// 导入计算属性behavior
//   需使用计算属性旧版api
const computedBehavior = require('miniprogram-computed').behavior

import { numStore } from '../../stores/number'
ComponentWithStore({
  // 注册behavior
  behaviors: [computedBehavior],
  storeBindings: {
    store: numStore,
    fields: ['numA', 'numB', 'sum'],
    actions: ['update']
  },
  computed: {
    storeTotal: (data) => {
      return data.numA + data.numB + data.sum
    }
  },
  watch: {
    'numA, numB': (newValA, newValB) => {
      console.log(newValA, newValB, 'newValA newValB')
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
