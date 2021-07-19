import request from '@/utils/request'

export function getMenuSearch(params) {
  return request({
    url: 'api/sys/menu/list',
    method: 'get',
    params
  })
}

export function getMenu(id) {
  return request({
    url: 'api/sys/menu/:id',
    method: 'get'
  })
}

export function createMenu(data) {
  return request({
    url: 'api/sys/menu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: 'api/sys/menu/:id',
    method: 'put',
    data
  })
}

export function deleteMenu(data) {
  return request({
    url: 'api/sys/menu/:id',
    method: 'delete'
  })
}
