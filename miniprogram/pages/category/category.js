import { reqCategoryData } from '../../api/category'
Page({
  data: {
    categoryList: [],
    secondaryList: [],
    activeIndex: 0
  },
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
    const { index } = event.currentTarget.dataset
    const currentCategory = this.data.categoryList[Number(index)]
    this.setData({
      activeIndex: index,
      secondaryList: currentCategory.children
    })
  }
})
