import request from '@/utils/request'

export function getImageCaptcha(query) {
  return request({
    url: 'api/common/captcha/img',
    method: 'get',
    query
  })
}
