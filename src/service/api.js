import http from './http'

/**
 * 首页
 */
// 获取轮播图、分类、广告相关数据
export function getNavData(params) {
  return http.post('/nav', params)
}
// 获取产品数据
export function getProducts() {
  return http.get('/product/getHomeProducts')
}

/**
 * 详情页
 */
// 获取商品信息
export function getGoodsInfo(id) {
  return http.get('/product?id=' + id, {})
}
// 获取商品评价数据
export function getGoodsRate(id, page) {
  return http.get('/product/getReviews?id=' + id + '&page=' + page, {})
}
// 获取商品收藏状态
export function getGoodsCollectStatus(params) {
  return http.post('/product/favorite', params)
}
// 加入购物车
export function toCart(params) {
  return http.post('/cart/add', params)
}

/**
 * 登陆页
 */
// 登陆
export function getLoginInfo(params) {
  return http.post('/index/login', params)
}
// 验证用户信息
export function getCheckLogin() {
  return http.get('/user')
}

/**
 * 购物车
 */
// 获取添加到购物车的数据
export function getComeCart() {
  return http.get('/cart')
}
// 删除商品
export function deleteGoods(params) {
  return http.post('/cart/delete', params)
}
// 清空购物车
export function clearCart() {
  return http.post('/cart/clear')
}
// 修改商品数量
export function changeGoodsCount(params) {
  return http.post('/cart/edit', params)
}

/**
 * 分类
 */
export function getCategory() {
  return http.get('/category')
}

/**
 * 商品列表
 */
export function getGoodsList(params) {
  return http.get('/product/getList', params)
}

/**
 * 订单页
 */
// 详情页创建订单
export function detailToOrder(params) {
  return http.get('/cart', params)
}
// 购物车页创建订单
export function cartToOrder(params) {
  return http.post('/cart/updateStatus', params)
}
// 获取商品金额
export function getPrice(params) {
  return http.post('/order/getPrice', params)
}
// 获取收获地址
export function getAddress() {
  return http.get('/user/getAddress')
}
// 提交订单
export function submitOrder(params) {
  return http.post('/order/add', params)
}

/**
 * 支付页
 */
// 支付金额
export function payAmount(params) {
  return http.get('/order/info?order_sn=' + params)
}

/**
 * 我的页面
 */
// 我的订单
export function profileOrder(state, page) {
  return http.get('/order?state=' + state + '&page=' + page)
}
// 取消订单
export function cancelOrder(params) {
  return http.post('/order/cancel', params)
}
// 删除订单
export function delOrder(params) {
  return http.post('/order/del', params)
}
// 新增或修改地址
export function changAddress(params) {
  return http.post('/user/editAddress', params)
}
// 删除地址
export function delAddress(params) {
  return http.post('/user/delAddress', params)
}
// 修改账号/密码
export function changeUserInfo(params) {
  return http.post('/user/editInfo', params)
}
// 退出登陆
export function signOut() {
  return http.post('/index/logout')
}
// 我的收藏
export function myFavorite() {
  return http.get('/user/favorite')
}