// components/custom01/custom01.js
// 如果需要在组件中使用 Store 中的数据与方法 需要从mobx-miniprogram-bindings中引入ComponetWithStore方法
// 再将component替换为componentWithStore方法
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

import { numStore } from '../../stores/number'
ComponentWithStore({
  // 配置与需要使用的store进行关联
  // 数据会被注册到data中
  // 方法会被注册到methods中
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
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
