import React, {useEffect, useState} from "react";
import {Button, Form, message, Modal, Tree} from "antd";
import {getFatherPermissionTree} from "@/services/ant-design-pro/permission";
import {addRolePermissionRelation, getRolePermissionRelation} from "@/services/ant-design-pro/role";

export default function Index(props){
  const {open,setOpen,roleId} = props

  const [treeData,setTreeData] = useState([]);
  const [checkedKeys,setCheckedKeys] = useState([]);


  useEffect(()=>{
    setCheckedKeys([])
    if (!roleId || roleId === ''){
      return
    }
    getFatherPermissionTree().then(
      value => {
        setTreeData(value.data)
      },
      reason => {
        message.error(reason.message)
      }
    )
    getRolePermissionRelation({roleId:roleId}).then(
      value => {
        const keys = value.data.map(item =>{
          return item.permissionId
        })
        setCheckedKeys(keys)
      },
      reason => {
        message.error(reason.message)
      }
    )
  },[roleId,open])

  const onOk = (e) => {
    const params = {
      roleId: roleId,
      permissions: checkedKeys.checked
    }
    addRolePermissionRelation(params).then(
      value => {
        message.info(value.message)
        setOpen(false)
      },
      reason => {

      }
    )
  }

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  }

  return (
    <Modal
      title={'用户授权'}
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
