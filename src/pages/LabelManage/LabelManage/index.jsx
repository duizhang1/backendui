import React from "react";
import { ProTable, PageContainer } from "@ant-design/pro-components";
import {deleteLabel, getList} from "@/services/ant-design-pro/label";
import {useRef, useState} from "react";
import AddFormModal from "@/pages/LabelManage/LabelManage/components/AddFormModal";
import {Button, message, Modal} from "antd";
import EditFormModal from "@/pages/LabelManage/LabelManage/components/EditFormModal"
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {deletePermission} from "@/services/ant-design-pro/permission";

export default function Index(){

  const actionRef = useRef()

  const [selectedRows,setSelectedRows] = useState([])

  const [editOpen,setEditOpen] = useState(false)
  const [editData,setEditData] = useState({});

  const [modal, contextHolder] = Modal.useModal();

  const columns = [
    {
      title: 'uuid',
      dateIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '标签名',
      dataIndex: 'labelName',
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

  const clickOnEdit = (e) => {
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
    modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: `确认删除这${selectedRows.length}条记录吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: (e) =>{
        return deleteLabel({labelId: selectedRows[0].uuid}).then(
          value => {
            actionRef.current.reload()
            actionRef.current.clearSelected()
            message.info(value.message)
          }
        )
      }
    });
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        headerTitle="标签列表"
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
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
            key={'addLabel'}
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
        ]}
      />
      <EditFormModal
        tableActionRef={actionRef}
        data={editData}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
      {contextHolder}
    </PageContainer>
  )
}
