import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/login',
    method: 'post',
    data
  })
}

export function getBaseInfo() {
  return request({
    url: 'api/login/baseInfo',
    method: 'get'
  })
}

export function getPermmenu() {
  return request({
    url: 'api/login/permmenu',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'api/login/logout',
    method: 'put'
  })
}
