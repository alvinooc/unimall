export default {
  // 商品选项信息
  getGoodsInfo(state, payload) {
    const [size, color] = payload.attrGroup
    const [sizeVal, colorVal] = payload.attrItems
    state.goodsInfo = {
      image: payload.image[0],
      price: payload.skus[0].price,
      stock: payload.skus[0].stock,
      sizes: { type: size, options: sizeVal },
      colors: { type: color, options: colorVal },
      defaultSize: sizeVal[0],
      defaultColor: colorVal ? colorVal[0] : '',
      skus: payload.skus
    }
  },
  // 商品尺寸信息
  changeGoodsSize(state, payload) {
    state.goodsInfo.defaultSize = payload
  },
  // 商品颜色信息
  changeGoodsColor(state, payload) {
    state.goodsInfo.defaultColor = payload
  },
  // 是否显示商品购买类型
  isShowGoodsType(state, payload) {
    state.isShowGoodsType = payload
  },
  // 增加商品数量
  increment(state) {
    state.count += 1
  },
  // 减少商品数量
  decrement(state) {
    state.count -= 1
    if (state.count <= 1) {
      state.count = 1
    }
  },
  // 获取加入购物车所需id
  getSku_id(state, payload) {
    return state.sku_id = payload
  },
  // 获取地址信息
  get_address(state, payload) {
    state.address = payload
  },
  // 获取登陆信息
  getUserInfo(state, payload) {
    state.userInfo = payload
    state.hasLogin = true
  }
}