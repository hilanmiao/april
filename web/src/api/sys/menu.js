import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: 'api/sys/menu/list',
    method: 'get'
  })
}

export function getMenuInfo(query) {
  return request({
    url: 'api/sys/menu/info',
    method: 'get',
    params: query
  })
}

export function createMenu(data) {
  return request({
    url: 'api/sys/menu/add',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: 'api/sys/menu/update',
    method: 'post',
    data
  })
}

export function deleteMenu(data) {
  return request({
    url: 'api/sys/menu/delete',
    method: 'post',
    data
  })
}
