import request from '@/utils/request'
const apiUrl = 'services/system/role/'

export function getRole(id) {
  return request({
    url: apiUrl + id,
    method: 'get'
  })
}

export function getRoleList() {
  return request({
    url: apiUrl + 'list',
    method: 'get'
  })
}

export function getRoleListByPage(params) {
  return request({
    url: apiUrl + 'page',
    method: 'get',
    params
  })
}

export function createRole(data) {
  return request({
    url: apiUrl,
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: apiUrl + id,
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: apiUrl,
    method: 'post',
    data
  })
}
