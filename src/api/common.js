import request from '@/utils/request'

export function region(id) {
  return request({
    url: '/pbl/index/region',
    method: 'get',
    params: { id: id }
  })
}