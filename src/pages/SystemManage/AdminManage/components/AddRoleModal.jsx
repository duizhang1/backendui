import React, {useEffect} from "react";
import {Modal, Tree, message} from "antd";
import {useState} from "react";
import {addAdminRole, getAdminRole} from "@/services/ant-design-pro/admin";
import {getTreeList} from "@/services/ant-design-pro/role";

export default function Index(props){
  const {open,setOpen,adminId} = props

  const [treeData,setTreeData] = useState([]);
  const [checkedKeys,setCheckedKeys] = useState([]);

  useEffect(()=>{
    setCheckedKeys([])
    if (!adminId || adminId === ''){
      return
    }
    getTreeList().then(
      value => {
        setTreeData(value.data)
      }
    )
    getAdminRole({adminId: adminId}).then(
      value => {
        const keys = value.data.map(item=>{
          return item.roleId
        })
        setCheckedKeys(keys);
      }
    )
  },[open,adminId])

  const onOk = (e) => {
    const params = {
      adminId: adminId,
      roleIds: checkedKeys.checked
    }
    addAdminRole(params).then(
      value => {
        setOpen(false)
        message.info(value.message)
      }
    )
  }

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  }

  return (
    <Modal
      title={'赋予角色'}
      open={open}
      onCancel={()=>{setOpen(false)}}
      destroyOnClose={true}
      onOk={onOk}
      style={{maxHeight: '300px'}}
    >
      <Tree
        treeData={treeData}
        checkable={true}
        checkStrictly={true}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        fieldNames={{
          title: 'title',
          key: 'value',
          children: 'children'
        }}
      />
    </Modal>
  )
}
