export default {
  // 商品尺寸颜色
  selectRes(state) {
    if (state.goodsInfo.defaultColor === '') {
      return state.goodsInfo.defaultSize
    } else {
      return state.goodsInfo.defaultSize + ','+ state.goodsInfo.defaultColor
    }
  }
}