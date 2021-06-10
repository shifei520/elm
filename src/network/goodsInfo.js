import { request } from './request'

// 食品分类列表
export function categoryFoodList() {
  return request({
    url: '/v2/index_entry'
  })
}

// 获取商铺列表
export function storeList(query) {
  return request({
    url: '/shopping/restaurants',
    params: query
  })
}

//搜索餐馆

export function searchRestaurant(queryInfo) {
  return request({
    url: '/v4/restaurants',
    params: queryInfo
  })
}

// 获取所有商铺分类列表
export function restaurantCategory(latitude, longitude) {
  return request({
    url: '/shopping/v2/restaurant/category',
    params: {
      latitude,
      longitude
    }
  })
}

// 获取配送方式
export function deliveryModes(latitude, longitude) {
  return request({
    url: '/shopping/v1/restaurants/delivery_modes',
    params: {
      latitude,
      longitude
    }
  })
}

// 商家属性活动列表
export function sellerAttr(latitude, longitude) {
  return request({
    url: '/shopping/v1/restaurants/activity_attributes',
    params: {
      latitude,
      longitude
    }
  })
}
