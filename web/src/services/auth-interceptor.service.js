import store from '../store'
import vm from '../main'
import { Message, MessageBox } from 'element-ui'
import { camelizeKeys } from '@/utils'

const internals = {}

internals.response = function(response) {
  // 递归下划线转驼峰
  let { data } = response
  data = camelizeKeys(data)
  const { code } = data

  if (code !== 200) {
    if (code === 20104) {
      // accessToken 过期，允许尝试一次 refreshToken，交由 http-client 处理
      response = 'EXPIRED_ACCESS_TOKEN'
    } else if (code === 20105 || code === 20109) {
      // 如果 accessToken 是无效的，或者 refreshToken 已过期，强制用户登录
      MessageBox.confirm('登录认证已过期，您可以取消停留在该页上，或重新登录', '警告', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.debug('accessToken 是无效的，或者 refreshToken 已过期，强制用户登录')
        store.dispatch('auth/clearAuth')
        vm.$router.push('/login')
      }).catch(() => {})
    }
    return Promise.reject(response)
  }

  return Promise.resolve(response)
}

internals.responseError = function(error) {
  // 系统错误
  const errorMessage = error && error.response && error.response.message || '发生了一些未知的错误，请重试！'
  Message.error(errorMessage)

  return Promise.reject(error)
}

export default {
  response: internals.response,
  responseError: internals.responseError
}
