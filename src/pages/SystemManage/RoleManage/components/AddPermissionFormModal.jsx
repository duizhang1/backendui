import React, {useEffect, useState} from "react";
import {Button, Form, message, Modal, Tree} from "antd";
import {getFatherPermissionTree} from "@/services/ant-design-pro/permission";

export default function Index(props){
  const {open,setOpen,roleId} = props

  const [treeData,setTreeData] = useState([]);
  const [checkedKeys,setCheckedKeys] = useState([]);

  useEffect(()=>{
    getFatherPermissionTree().then(
      value => {
        setTreeData(value.data)
      },
      reason => {
        message.error(reason.message)
      }
    )
  })

  useEffect(()=>{

  },[roleId])

  const onOk = (e) => {

  }

  const onCheck = (checkedKeysValue) => {
    console.log(checkedKeysValue)
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
