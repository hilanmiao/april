import request from '@/utils/request'
const apiUrl = 'api/system/menu/'

export function getMenuAndParentMenu(params) {
  return request({
    url: apiUrl + 'menu-and-parent-menu',
    method: 'get',
    params
  })
}

export function getMenuList() {
  return request({
    url: apiUrl + 'list',
    method: 'get'
  })
}

export function createMenu(data) {
  return request({
    url: apiUrl,
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: apiUrl,
    method: 'put',
    data
  })
}

export function deleteMenu(data) {
  return request({
    url: apiUrl,
    method: 'delete',
    data
  })
}
