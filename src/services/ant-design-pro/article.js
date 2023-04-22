import {request} from "umi";

/**  GET 获得分页的文章数据 /api/article/getList   */
export async function getList(params,options) {
  return request('/api/article/getList',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

/**  GET 获得文章数据 /api/article/getArticleInfo   */
export async function getArticleInfo(params,options) {
  return request('/api/article/getArticleInfo',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

/**  GET 获得审核文章 /api/article/getReviewArticle   */
export async function getReviewArticle(params,options) {
  return request('/api/article/getReviewArticle',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}

/**  POST 文章审核通过 /api/article/articleReviewPass   */
export async function articleReviewPass(params) {
  return request('/api/article/articleReviewPass',{
    method: 'POST',
    data: {
      ...params
    },
  })
}

/**  POST 文章审核失败 /api/article/articleReviewFailed   */
export async function articleReviewFailed(params) {
  return request('/api/article/articleReviewFailed',{
    method: 'POST',
    data: {
      ...params
    },
  })
}

/**  GET 获得管理员审核文章 /api/article/getAdminReviewed   */
export async function getAdminReviewed(params,options) {
  return request('/api/article/getAdminReviewed',{
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  })
}
