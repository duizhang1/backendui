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
