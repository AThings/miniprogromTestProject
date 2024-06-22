export const swipeCell = Behavior({
  data: {
    swipeCellQueue: []
  },
  methods: {
    swipeCellOpen(event) {
      const id = event.currentTarget.id

      const instance = this.selectComponent(`#${id}`)
      this.data.swipeCellQueue.push(instance)
    },
    closeAllSwipeCell() {
      this.data.swipeCellQueue.forEach((item) => {
        item.close()
      })
      this.data.swipeCellQueue = []
    }
  }
})
