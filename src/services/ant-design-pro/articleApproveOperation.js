import {request} from "umi";

/**  GET 获得文章审核记录 /api/articleApproveOperation/getArticleOperation   */
export async function getArticleOperation(params,options) {
  return request('/api/articleApproveOperation/getArticleOperation',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}
