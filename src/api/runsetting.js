import request from '@/utils/request'

export function costCreate(data) {
  return request({
    url: '/runerrands/cost/create',
    method: 'post',
    data
  })
}

export function costUpdate(data) {
  return request({
    url: '/runerrands/cost/update',
    method: 'post',
    data
  })
}

export function costView() {
  return request({
    url: '/runerrands/cost/view',
    method: 'get'
  })
}

export function drawMoneyList(params) {
  return request({
    url: '/user/user-fund/draw-money-list',
    method: 'get',
    params:params
  })
}

export function drawMoneyUpdate(data) {
  return request({
    url: '/user/user-fund/draw-money-update',
    method: 'post',
    data
  })
}
export function drawMoneyView(id) {
  return request({
    url: '/user/user-fund/draw-money-view',
    method: 'get',
    params:{id:id}
  })
}