import request from '@/utils/request'

export function getBasic() {
  return request({
    url: 'api/system/user/basic',
    method: 'get'
  })
}
