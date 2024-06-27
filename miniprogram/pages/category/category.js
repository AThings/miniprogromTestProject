import { reqCategoryData } from '@/api/category'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { numStore } from '@/stores/number'
ComponentWithStore({
  storeBindings: {
    store: numStore,
    fields: ['numA', 'numB', 'sum'],
    actions: ['update']
  },
  data: {
    categoryList: [],
    secondaryList: [],
    activeIndex: 0
  },
  methods: {
    onLoad() {
      this.getCategoryData()
    },
    getCategoryData() {
      reqCategoryData().then((res) => {
        this.setData({
          categoryList: res.data,
          activeIndex: 0,
          secondaryList: res.data[0].children
        })
      })
    },
    //   选择一级标签
    handleSelectCategory(event) {
      const { index } = event.target.dataset
      const currentCategory = this.data.categoryList[Number(index)]
      this.setData({
        activeIndex: index,
        secondaryList: currentCategory.children
      })
    }
  }
})
