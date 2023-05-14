import {request} from 'umi';

/** GET 获得权限列表 /api/permission/getList */
export async function getPermissionData(params, options) {
  return request('/api/permission/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** GET 获得所有父级权限的treeData，用于下拉框  /api/permission/getFatherPermissionTree */
export async function getFatherPermissionTree() {
  return request('/api/permission/getFatherPermissionTree',{
    method: 'GET'
  })
}

/** POST 添加权限 /api/permission/addPermission */
export async function addPermission(options) {
  return request('/api/permission/addPermission',{
    method: 'POST',
    data: {
      ...options
    }
  })
}

/** DELETE 删除权限 /api/permission/deletePermission */
export async function deletePermission(params,options) {
  return request('/api/permission/deletePermission',{
    method: 'DELETE',
    params: {
      ...params
    }
  })
}

/** POST 更新权限状态 /api/permission/updateStatus */
export async function updateStatusEnable(params,options) {
  return request('/api/permission/updateStatus',{
    method: 'POST',
    data: {
      ...params,
      status: 1,
    }
  })
}

/** POST 更新权限状态 /api/permission/updateStatus */
export async function updateStatusDisAble(params,options) {
  return request('/api/permission/updateStatus',{
    method: 'POST',
    data: {
      ...params,
      status: 0,
    }
  })
}

/** GET 获得权限通过ID  /api/permission/getPermissionById */
export async function getPermissionById(params) {
  return request('/api/permission/getPermissionById',{
    method: 'GET',
    params: {
      ...params
    }
  })
}

/** POST 编辑权限 /api/permission/editPermission */
export async function editPermission(options) {
  return request('/api/permission/editPermission',{
    method: 'POST',
    data: {
      ...options
    }
  })
}

/** GET 获得tree的权限列表  /api/permission/getPermissionTree */
export async function getPermissionTree(params) {
  return request('/api/permission/getPermissionTree',{
    method: 'GET',
    params: {
      ...params
    }
  })
}

/** GET 获得用户的权限列表  /api/permission/getUserPermission */
export async function getUserPermission(params) {
  return request('/api/permission/getUserPermission',{
    method: 'GET',
    params: {
      ...params
    }
  })
}
