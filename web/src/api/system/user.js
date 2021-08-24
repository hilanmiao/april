import request from '@/utils/request'
const apiUrl = 'api/system/user/'

export function getUserBasic() {
  return request({
    url: apiUrl + 'basic',
    method: 'get'
  })
}

export function getUser(params) {
  return request({
    url: apiUrl,
    method: 'get',
    params
  })
}

export function getUserList() {
  return request({
    url: apiUrl + 'list',
    method: 'get'
  })
}

export function getUserListByPage(params) {
  return request({
    url: apiUrl + 'page',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: apiUrl,
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: apiUrl,
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: apiUrl,
    method: 'delete',
    data
  })
}
