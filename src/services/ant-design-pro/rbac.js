import {request} from 'umi';

/** 获得 POST /api/login/captcha */
export async function getPermissionData(params, options) {
  return request('/api/permission/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
