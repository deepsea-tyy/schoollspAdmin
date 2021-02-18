import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function studentList(data) {
  return request({
    url: '/user/student-auth/index',
    method: 'get',
    params:data
  })
}

export function studentUpdate(data) {
  return request({
    url: '/user/student-auth/update',
    method: 'post',
    data
  })
}

export function studentView(id) {
  return request({
    url: '/user/student-auth/view',
    method: 'get',
    params:{user_id:id}
  })
}

export function realNameList(data) {
  return request({
    url: '/user/real-name-auth/index',
    method: 'get',
    params:data
  })
}

export function realNameUpdate(data) {
  return request({
    url: '/user/real-name-auth/update',
    method: 'post',
    data
  })
}

export function realNameView(id) {
  return request({
    url: '/user/real-name-auth/view',
    method: 'get',
    params:{user_id:id}
  })
}

export function riderList(data) {
  return request({
    url: '/runerrands/rider/index',
    method: 'get',
    params:data
  })
}

export function riderUpdate(data) {
  return request({
    url: '/runerrands/rider/update',
    method: 'post',
    data
  })
}

export function riderView(id) {
  return request({
    url: '/runerrands/rider/view',
    method: 'get',
    params:{user_id:id}
  })
}
