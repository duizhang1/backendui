import {request} from "umi";

/** GET 获得用户列表 /api/user/getList */
export async function getList(params, options) {
  return request('/api/user/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POSt 修改用户信息 /api/user/editUser */
export async function editUser(params, options) {
  return request('/api/user/editUser', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** GET 获得用户 /api/user/getUserById */
export async function getUserById(params, options) {
  return request('/api/user/getUserById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
