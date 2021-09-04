import request from '@/utils/request'
const apiUrl = 'services/system/login-log/'

export function getLoginLogListByPage(params) {
  return request({
    url: apiUrl + 'page',
    method: 'get',
    params
  })
}
