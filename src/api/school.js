import request from '@/utils/request'

export function schoolList(data) {
  return request({
    url: '/runerrands/school/index',
    method: 'get',
    params: data
  })
}

export function schoolCreate(data) {
  return request({
    url: '/runerrands/school/create',
    method: 'post',
    data
  })
}

export function schoolUpdate(data) {
  return request({
    url: '/runerrands/school/update',
    method: 'post',
    data
  })
}

export function schoolView(id) {
  return request({
    url: '/runerrands/school/view',
    method: 'get',
    params: { user_id: id }
  })
}
