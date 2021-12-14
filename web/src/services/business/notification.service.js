import { httpClient as http } from '@/services'
const internals = {}
const apiUrl = 'api/notification/'

internals.getNotification = (params) => {
  return http.get(apiUrl, params)
}

internals.getNotificationList = (params) => {
  return http.get(apiUrl + 'list', params)
}

internals.getNotificationListByPage = (params) => {
  return http.get(apiUrl + 'page', params)
}

internals.createNotification = (data) => {
  return http.post(apiUrl, data)
}

internals.updateNotification = (data) => {
  return http.put(apiUrl, data)
}

internals.deleteNotification = (data) => {
  return http.delete(apiUrl, data)
}

internals.syncNotification = (data) => {
  return http.post(apiUrl + 'sync', data)
}

export default internals
