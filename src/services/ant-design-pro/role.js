import {request} from 'umi';

/** GET 获得角色列表 /api/role/getList */
export async function getRoleData(params, options) {
  return request('/api/role/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POST 添加角色 /api/role/addRole */
export async function addRole(options) {
  return request('/api/role/addRole',{
    method: 'POST',
    data: {
      ...options
    }
  })
}

/** POST 修改角色 /api/role/editRole */
export async function editRole(params) {
  return request('/api/role/editRole',{
    method: 'POST',
    data: {
      ...params
    }
  })
}


/** DELETE 修改角色 /api/role/deleteRole */
export async function deleteRole(params) {
  return request('/api/role/deleteRole',{
    method: 'DELETE',
    params: {
      ...params
    }
  })
}

/** POST 修改状态为生效 /api/role/updateStatus */
export async function updateStatusEnable(params) {
  return request('/api/role/updateStatus',{
    method: 'POST',
    data: {
      ...params,
      status: 1
    }
  })
}

/** POST 修改状态为失效 /api/role/updateStatus */
export async function updateStatusDisable(params) {
  return request('/api/role/updateStatus',{
    method: 'POST',
    data: {
      ...params,
      status: 0
    }
  })
}

/** GET 获得角色权限 /api/rolePermissionRelation/getRolePermissionRelation */
export async function getRolePermissionRelation(params, options) {
  return request('/api/rolePermissionRelation/getRolePermissionRelation', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POST 添加角色权限 /api/rolePermissionRelation/addRolePermissionRelation */
export async function addRolePermissionRelation(params, options) {
  return request('/api/rolePermissionRelation/addRolePermissionRelation', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/** GET 获得角色权限 /api/role/getTreeList */
export async function getTreeList(params, options) {
  return request('/api/role/getTreeList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
