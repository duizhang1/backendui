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
