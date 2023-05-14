/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser,permissionList?: any[] } | undefined) {
  const { permissionList } = initialState ?? {};
  const permissionMap = new Map();
  for (let i = 0;permissionList && i < permissionList.length; i++){
    permissionMap.set(permissionList.at(i).uri,1);
  }
  return {
    // 标签管理
    labelManage: permissionMap.has('/labelSortManage/labelManage'),
    addLabel: permissionMap.has('/label/addLabel'),
    deleteLabel: permissionMap.has('/label/deleteLabel'),
    editLabel: permissionMap.has('/label/editLabel'),
    // 分区管理
    sortManage: permissionMap.has('/labelSortManage/sortManage'),
  };
}
