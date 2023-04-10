import React from "react";
import { ProTable, PageContainer } from "@ant-design/pro-components";
import {statusEnum} from "@/enum/enum";
import {useRef, useState} from "react";
import AddFormModal from "@/pages/SystemManage/RoleManage/components/AddFormModal";
import EditFormModal from "@/pages/SystemManage/RoleManage/components/EditFormModal";
import AddPermissionFormModal from "@/pages/SystemManage/RoleManage/components/AddPermissionFormModal";
import { Button, message, Modal } from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons"
import {deleteRole, getRoleData, updateStatusDisable, updateStatusEnable} from "@/services/ant-design-pro/role";


export default function Index(){
  const [selectedRows,setSelectedRows] = useState([])
  const [editOpen,setEditOpen] = useState(false)
  const [editData,setEditData] = useState({});
  const [addPermissionOpen,setAddPermissionOpen] = useState(false)
  const [roleId,setRoleId] = useState('')

  const [modal, contextHolder] = Modal.useModal();

  const actionRef = useRef()

  const columns = [
    {
      title: 'uuid',
      dataIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '启用状态',
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
    if (selectedRows.length === 0){
      message.error("至少选择一条记录")
      return
    }
    modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: `确认删除这${selectedRows.length}条记录吗？`,
      okText: '确认',
      cancelText: '取消',
      open: confirmOpen,
      onOk: (e) =>{
        const ids = selectedRows.map((item)=>{
          return item.uuid
        })
        return deleteRole({ids: ids}).then(
          value => {
            actionRef.current.reload()
            message.info(value.message)
          },
          reason => {
            message.error(reason.message)
          }
        )
      }
    });
  }

  const clickOnEnable = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    updateStatusEnable({uuid: selectedRows[0].uuid}).then(
      value => {
        actionRef.current.reload()
        message.info(value.message)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  const clickOnDisAble = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    updateStatusDisable({uuid: selectedRows[0].uuid}).then(
      value => {
        actionRef.current.reload()
        message.info(value.message)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  const clickOnAddPermission = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    setAddPermissionOpen(true)
    setRoleId(selectedRows[0]?.uuid)
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
        headerTitle="角色列表"
        columns={columns}
        request={async (
          params, sort, filter
        ) => {
          const value = await getRoleData(params);
          return {
            data: value.data.data,
            success: value.code === '200',
            total: value.data.total
          }
        }}
        rowKey={"uuid"}
        toolBarRender={() => [
          <AddFormModal
            key={'addRole'}
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
            onClick={clickOnAddPermission}
          >
            授权
          </Button>,
        ]}
      />
      <EditFormModal
        tableActionRef={actionRef}
        data={editData}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
      <AddPermissionFormModal
        open={addPermissionOpen}
        setOpen={setAddPermissionOpen}
        roleId={roleId}
      />
      {contextHolder}
    </PageContainer>
  )
}
