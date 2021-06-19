import request from '@/utils/request'

export function getAuthList() {
  return request.get('/rights/list')
}

export function getRoleList() {
  return request.get('/roles')
}
