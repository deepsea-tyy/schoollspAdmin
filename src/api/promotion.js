import request from '@/utils/request'

export function promotionList(data) {
  return request({
    url: '/promotion/promotion/index',
    method: 'get',
    params: data
  })
}

export function promotionVew(id) {
  return request({
    url: '/promotion/promotion/view',
    method: 'get',
    params: {id:id}
  })
}

export function couponList(query) {
  return request({
    url: '/promotion/promotion/coupon',
    method: 'get',
    params: query
  })
}
