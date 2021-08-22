import request from '@/utils/request'

export function getMenuList(params) {
  return request({
    url: 'api/system/menu/list',
    method: 'get',
    params
  })
}

export function getMenu(id) {
  return request({
    url: 'api/system/menu/' + id,
    method: 'get'
  })
}

export function createMenu(data) {
  return request({
    url: 'api/system/menu',
    method: 'post',
    data
  })
}

export function updateMenu(id, data) {
  return request({
    url: 'api/system/menu/' + id,
    method: 'put',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: 'api/system/menu/' + id,
    method: 'delete'
  })
}
