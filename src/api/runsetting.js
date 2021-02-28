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