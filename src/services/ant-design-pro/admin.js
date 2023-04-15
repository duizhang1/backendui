import {request} from "@@/plugin-request/request";

/** 登录接口 POST /api/login/account */
export async function login(body,options) {
  return request('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**  GET /api/admin/getCurrentAdmin   */
export async function getCurrentAdmin(body,options) {
  return request('/api/admin/getCurrentAdmin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**  GET 获得分页的管理员数据 /api/admin/getList   */
export async function getList(params,options) {
  return request('/api/admin/getList',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

/**  POST 添加的管理员数据 /api/admin/addAdmin   */
export async function addAdmin(params) {
  return request('/api/admin/addAdmin',{
    method: 'POST',
    data: {
      ...params
    },
  })
}

/**  POST 修改管理员数据 /api/admin/editAdmin   */
export async function editAdmin(params) {
  return request('/api/admin/editAdmin',{
    method: 'POST',
    data: {
      ...params
    },
  })
}

/**  DELETE 删除管理员数据 /api/admin/deleteAdmin   */
export async function deleteAdmin(params) {
  return request('/api/admin/deleteAdmin',{
    method: 'DELETE',
    params: {
      ...params
    },
  })
}

/**  POST 生效管理员 /api/admin/updateStatus   */
export async function updateEnableStatus(params) {
  return request('/api/admin/updateStatus',{
    method: 'POST',
    data: {
      ...params,
      status: 1
    },
  })
}

/**  POST 失效管理员 /api/admin/updateStatus   */
export async function updateDisableStatus(params) {
  return request('/api/admin/updateStatus',{
    method: 'POST',
    data: {
      ...params,
      status: 0
    },
  })
}

/**  GET 获得分页的管理员数据 /api/adminRoleRelation/getAdminRole   */
export async function getAdminRole(params,options) {
  return request('/api/adminRoleRelation/getAdminRole',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

/**  POST 给用户添加角色 /api/adminRoleRelation/addAdminRole   */
export async function addAdminRole(params) {
  return request('/api/adminRoleRelation/addAdminRole',{
    method: 'POST',
    data: {
      ...params
    },
  })
}

/**  POST 重置密码 /api/admin/resetPassword   */
export async function resetPassword(params) {
  return request('/api/admin/resetPassword',{
    method: 'POST',
    data: {
      ...params
    },
  })
}
