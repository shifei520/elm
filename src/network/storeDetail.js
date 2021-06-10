import { request } from './request'

// 餐馆详情信息
export function storeDetailInfo(shopid) {
  return request({
    url: '/shopping/restaurant/' + shopid
  })
}
// 获取食品列表
export function foodCateMenu(restaurant_id) {
  return request({
    url: '/shopping/v2/menu',
    params: {
      restaurant_id
    }
  })
}
