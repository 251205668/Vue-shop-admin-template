import request from '@/utils/request'

export function userLogin (userInfo) {
  return request.post('/login', {
    ...userInfo
  })
}
