import request from '@/utils/request'

export function getBasic() {
  return request({
    url: 'api/sys/user/basic',
    method: 'get'
  })
}
