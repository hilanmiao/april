import request from '@/utils/request'

export function getPowerMenus() {
  return request({
    url: 'api/system/power/power_menus',
    method: 'get'
  })
}

export function getMyPowerMenus() {
  return request({
    url: 'api/system/power/my_power_menus',
    method: 'get'
  })
}

export function getMyPowerOperations() {
  return request({
    url: 'api/system/power/my_power_operations',
    method: 'get'
  })
}

