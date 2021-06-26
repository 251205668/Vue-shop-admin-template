import request from '@/utils/request'

export function getAuthList() {
  return request.get('/rights/list')
}
export function getAuthTree() {
  return request.get('/rights/tree')
}

export function getRoleList() {
  return request.get('/roles')
}

export function addRole(roleInfo) {
  return request.post('/roles', {
    ...roleInfo
  })
}

export function editRole(roleInfo) {
  return request.put(`/roles/${roleInfo.id}`, {
    roleName: roleInfo.roleName,
    roleDesc: roleInfo.roleDesc
  })
}

export function deleteRole(id) {
  return request.delete(`/roles/${id}`)
}

export function modifyRoleAuth(roleId, rids) {
  return request.post(`/roles/${roleId}/rights`, {
    rids
  })
}

export function deleteRoleAuth(roleId, rid) {
  return request.delete(`/roles/${roleId}/rights/${rid}`)
}
