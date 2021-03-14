import request from '@/utils/request'

export function settingList(data) {
  return request({
    url: '/backend/setting/index',
    method: 'get',
    params: data
  })
}
export function settingUpdate(data) {
  return request({
    url: '/backend/setting/update',
    method: 'post',
    params: data
  })
}