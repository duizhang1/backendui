import {request} from "umi";

/**  GET 获得审核评论 /api/articleComment/getCommentPage   */
export async function getCommentPage(params,options) {
  return request('/api/articleComment/getCommentPage',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

