import { request } from './request'


// 获取轮播图、分类、广告相关数据
export function getHomeNavData(data, method) {
  return request({
    url: '/nav',
    data,
    method
  })
}