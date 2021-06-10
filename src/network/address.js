import { request } from './request'

//搜索地址
export function searchAddress(query) {
  return request({
    url: '/v1/pois',
    params: query
  })
}
// 根据经纬度详细定位
export function detailAddress(geohash) {
  return request({
    url: '/v2/pois/' + geohash
  })
}
