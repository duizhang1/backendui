export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '首页',
    component: './Welcome',
  },
  {
    name: '用户管理',
    path: '/userManage',
    component: './NNUserManage'
  },
  {
    name: '文章管理',
    path: '/articleManage',
    routes: [
      {
        name: '文章查看',
        path: '/articleManage/articleList',
        component: './ArticleManage/ArticleList'
      },
      {
        name: '文章审核',
        path: '/articleManage/articleReview',
        component: './ArticleManage/ArticleReview'
      },
      {
        name: '审核查看',
        path: '/articleManage/articleOperation',
        component: './ArticleManage/ArticleOperation'
      },
    ]
  },
  {
    name: '评论管理',
    path: '/commentManage',
    component: './CommentManage'
  },
  {
    path: '/articleInfo',
    component: './ArticleManage/ArticleInfo'
  },
  {
    name: '标签分区管理',
    path: '/labelSortManage',
    routes: [
      {
        name: '标签管理',
        path: '/labelSortManage/labelManage',
        component: './LabelManage/LabelManage',
        access: 'labelManage',
      },
      {
        name: '分区管理',
        path: '/labelSortManage/sortManage',
        component: './LabelManage/SortManage',
        access: 'sortManage'
      }
    ]
  },
  {
    name: '系统管理',
    path: '/systemManage',
    routes: [
      {
        name: '权限管理',
        path: '/systemManage/permissionManage',
        component: './SystemManage/PermissionManage'
      },
      {
        name: '角色管理',
        path: '/systemManage/roleManage',
        component: './SystemManage/RoleManage'
      },
      {
        name: '管理员管理',
        path: '/systemManage/adminManage',
        component: './SystemManage/AdminManage'
      },
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
