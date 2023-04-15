import React from "react";
import { ProTable, PageContainer } from "@ant-design/pro-components";
import {statusEnum} from "@/enum/enum";
import {Avatar, Button, message} from 'antd';
import {useRef, useState} from "react";
import AddFormModal from "@/pages/SystemManage/AdminManage/components/AddFormModal";
import {
  deleteAdmin,
  getList,
  resetPassword,
  updateDisableStatus,
  updateEnableStatus
} from "@/services/ant-design-pro/admin";
import EditFormModal from "@/pages/SystemManage/AdminManage/components/EditFormModal";
import AddRoleModal from "@/pages/SystemManage/AdminManage/components/AddRoleModal";

export default function Index(){

  const actionRef = useRef()

  const [selectedRows,setSelectedRows] = useState([])

  const [editOpen,setEditOpen] = useState(false)
  const [editData,setEditData] = useState({});

  const [adminId,setAdminId] = useState('')
  const [addRoleOpen,setAddRoleOpen] = useState(false)

  const columns = [
    {
      title: 'uuid',
      dataIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (text,record,index,action) =>{
        return (<Avatar src={text} />)
      }
    },
    {
      title: '用户账号',
      dataIndex: 'username'
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: '简介',
      dataIndex: 'note',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: statusEnum,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
  ]

  const clickOnEdit = (e) =>{
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    setEditData(selectedRows[0])
    setEditOpen(true)
  }

  const clickOnDelete = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    const params = {id: selectedRows[0].uuid}
    deleteAdmin(params).then(
      value => {
        message.info(value.message)
        actionRef.current.reload()
      }
    )
  }

  const clickOnEnable = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    const params = {uuid: selectedRows[0].uuid}
    updateEnableStatus(params).then(
      value => {
        message.info(value.message)
        actionRef.current.reload()
      }
    )
  }

  const clickOnDisAble = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    const params = {uuid: selectedRows[0].uuid}
    updateDisableStatus(params).then(
      value => {
        message.info(value.message)
        actionRef.current.reload()
      }
    )
  }

  const clickOnAddRole = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    setAdminId(selectedRows[0].uuid)
    setAddRoleOpen(true)
  }

  const clickOnResetPassword = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    resetPassword({uuid: selectedRows[0].uuid}).then(
      value => {
        message.info(value.message)
      }
    )
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        headerTitle="用户列表"
        columns={columns}
        request={async (
          params,sort,filter
        ) => {
          const value = await getList(params);
          return {
            data: value.data.data,
            success: value.code === '200',
            total: value.data.total
          }
        }}
        rowKey={"uuid"}
        toolBarRender={() => [
          <AddFormModal
            key={'addAdmin'}
            tableActionRef={actionRef}
          />,
          <Button
            type={'primary'}
            onClick={clickOnEdit}
          >
            修改
          </Button>,
          <Button
            type={'primary'}
            onClick={clickOnDelete}
          >
            删除
          </Button>,
          <Button
            type={'primary'}
            onClick={clickOnEnable}
          >
            生效
          </Button>,
          <Button
            type={'primary'}
            onClick={clickOnDisAble}
          >
            失效
          </Button>,
          <Button
            type={'primary'}
            onClick={clickOnAddRole}
          >
            赋角
          </Button>,
          <Button
            type={'primary'}
            onClick={clickOnResetPassword}
          >
            重置密码
          </Button>,
        ]}
      />
      <EditFormModal
        tableActionRef={actionRef}
        data={editData}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
      <AddRoleModal
        open={addRoleOpen}
        setOpen={setAddRoleOpen}
        adminId={adminId}
      />
    </PageContainer>
  )

}
