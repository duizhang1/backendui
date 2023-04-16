import React, { useState } from "react";
import { ProTable, PageContainer } from "@ant-design/pro-components";
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  deletePermission,
  getPermissionData,
  updateStatusDisAble,
  updateStatusEnable
} from "@/services/ant-design-pro/permission";
import {useRef} from "react";
import {permissionTypeEnum, statusEnum} from "@/enum/enum";
import AddFormModal from './components/AddFormModal'
import EditFormModal from './components/EditFormModal'


export default function Index() {
  const [modal, contextHolder] = Modal.useModal();
  const [selectedRows,setSelectedRows] = useState([])
  const [editOpen,setEditOpen] = useState(false)
  const [editUuid,setEditUuid] = useState('')

  const actionRef = useRef()

  const columns = [
    {
      title: 'uuid',
      dataIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '父级权限ID',
      dataIndex: 'pid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'name',
    },
    {
      title: '权限值',
      dataIndex: 'value',
      valueType: 'value',
    },
    {
      title: '权限类型',
      dataIndex: 'type',
      valueEnum: permissionTypeEnum,
    },
    {
      title: '前端资源路径',
      dataIndex: 'uri',
      valueType: 'uri',
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
    }
  ]

  const clickOnDelete = (e) =>{
    if (selectedRows.length === 0){
      message.error("请至少选择一条记录")
      return
    }
    modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: `确认删除这${selectedRows.length}条记录吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: (e) =>{
        const ids = selectedRows.map(item => {
          return item.uuid
        })
        const params = {
          ids
        }
        return deletePermission(params).then(
          value => {
            actionRef.current.reload()
            actionRef.current.clearSelected()
            message.info(value.message)
          },
          reason => {
            message.error(reason.message)
          }
        )
      }
    });
  }

  const clickOnEnable = (e) =>{
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    updateStatusEnable({id: selectedRows[0].uuid}).then(
      value => {
        actionRef.current.reload()
        message.info(value.message)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  const clickOnDisAble = (e) =>{
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    updateStatusDisAble({id: selectedRows[0].uuid}).then(
      value => {
        actionRef.current.reload()
        message.info(value.message)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  const clickOnEdit = (e) =>{
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    setEditOpen(true)
    setEditUuid(selectedRows[0].uuid)
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
        headerTitle="权限列表"
        columns={columns}
        request={async (
          params, sort, filter
        ) => {
          const value = await getPermissionData(params);
          return {
            data: value.data.data,
            success: value.code === '200',
            total: value.data.total
          }
        }}
        rowKey={"uuid"}
        toolBarRender={() => [
          <AddFormModal
            key={'addPermission'}
            tableActionRef={actionRef}
          />,
          <Button
            type={'primary'}
            onClick={clickOnEdit}
          >
            编辑
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
        ]}
      />
      {contextHolder}
      <EditFormModal
        open={editOpen}
        setOpen={setEditOpen}
        uuid={editUuid}
        tableActionRef={actionRef}
        />
    </PageContainer>
  )

}
