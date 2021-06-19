import request from '@/utils/request'

export function userLogin (userInfo) {
  return request.post('/login', {
    ...userInfo
  })
}

export function getUserList(query, pagenum, pagesize) {
  return request.get(`/users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
}

export function modifyState(uid, type) {
  return request.put(`/users/${uid}/state/${type}`)
}

export function addUser(userInfo) {
  return request.post('/users', {
    ...userInfo
  })
}

export function editUser(userInfo) {
  return request.put(`/users/${userInfo.id}`, {
    email: userInfo.email,
    mobile: userInfo.mobile
  })
}

export function getUserInfoById(id) {
  return request.get(`/users/${id}`)
}

export function deleteUserById(id) {
  return request.delete(`/users/${id}`)
}

export function getRoles() {
  return request.get('/roles')
}

export function userSelectRole(uid, rid) {
  return request.put(`/users/${uid}/role`, {
    rid
  })
}
