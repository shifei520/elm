import { request } from './request'

//获取城市列表-----定位城市/热门城市/所有城市
export function citiesList(type) {
  return request({
    url: '/v1/cities',
    params: {
      type
    }
  })
}
// 获取所选城市信息
export function cityCheckedInfo(id) {
  return request({
    url: '/v1/cities/' + id
  })
}
