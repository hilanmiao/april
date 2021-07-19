import request from '@/utils/request'

export function getMyPowerMenus() {
  return request({
    url: 'api/sys/power/my_power_menus',
    method: 'get'
  })
}

export function getMyPowerOperations() {
  return request({
    url: 'api/sys/power/my_power_operations',
    method: 'get'
  })
}

