import {request} from "umi";

/**  GET 获得评论 /api/articleComment/getCommentPage   */
export async function getCommentPage(params,options) {
  return request('/api/articleComment/getCommentPage',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

/**  DELETE 删除评论 /api/articleComment/deleteArticleComment   */
export async function deleteArticleComment(params,options) {
  return request('/api/articleComment/deleteArticleComment',{
    method: 'DELETE',
    params: {
      ...params
    },
    ...(options || {}),
  })
}
