import request from '@/utils/request'

export function orderList(data) {
  return request({
    url: '/runerrands/order/index',
    method: 'get',
    params: data
  })
}

export function orderVew(id) {
  return request({
    url: '/runerrands/order/view',
    method: 'get',
    params: {id:id}
  })
}
