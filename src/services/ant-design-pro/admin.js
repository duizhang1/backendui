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
