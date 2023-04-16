import {request} from 'umi';

/** GET 获得角色列表 /api/label/getList */
export async function getList(params, options) {
  return request('/api/label/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POSt 添加标签 /api/label/addLabel */
export async function addLabel(params, options) {
  return request('/api/label/addLabel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** POSt 修改标签 /api/label/editLabel */
export async function editLabel(params, options) {
  return request('/api/label/editLabel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** DELETE 获得角色列表 /api/label/deleteLabel */
export async function deleteLabel(params, options) {
  return request('/api/label/deleteLabel', {
    method: 'DELETE',
    params: {
      ...params,
    }
  });
}
