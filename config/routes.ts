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
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: '标签分类管理',
    path: '/labelSortManage',
    routes: [
      {
        name: '标签管理',
        path: '/labelSortManage/labelManage',
        component: './LabelManage/LabelManage'
      },
      {
        name: '分区管理',
        path: '/labelSortManage/sortManage',
        component: './LabelManage/SortManage'
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
        name: '用户管理',
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
