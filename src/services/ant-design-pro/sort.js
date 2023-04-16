import {request} from "umi";

/** GET 获得分区列表 /api/sort/getList */
export async function getList(params, options) {
  return request('/api/sort/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POSt 添加标签 /api/sort/addSort */
export async function addSort(params, options) {
  return request('/api/sort/addSort', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** POSt 修改标签 /api/sort/editSort */
export async function editSort(params, options) {
  return request('/api/sort/editSort', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** DELETE 获得角色列表 /api/sort/deleteSort */
export async function deleteSort(params, options) {
  return request('/api/sort/deleteSort', {
    method: 'DELETE',
    params: {
      ...params,
    }
  });
}
