import React, {useRef} from "react";
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {sexEnum} from "@/enum/enum";
import {Avatar, Button, message, Modal} from "antd";
import {useState} from "react";
import {getList} from "@/services/ant-design-pro/user";
import EditFormModal from './components/EditFormModal'

export default function Index(){

  const [modal, contextHolder] = Modal.useModal();
  const [selectedRows,setSelectedRows] = useState([])
  const [editOpen,setEditOpen] = useState(false)
  const [editData,setEditData] = useState({})

  const actionRef = useRef()

  const columns = [
    {
      title: 'uuid',
      dateIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'emailAddress',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: sexEnum
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
      title: '公司名',
      dataIndex: 'companyName',
    },
    {
      title: '职位',
      dataIndex: 'position',
    },
    {
      title: '个人简述',
      dataIndex: 'personProfile',
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
    setEditOpen(true)
    setEditData(selectedRows[0])
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        headerTitle="用户列表"
        request={async (
          params, sort, filter
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
          <Button
            type={'primary'}
            onClick={clickOnEdit}
          >
            编辑
          </Button>
        ]}
      />
      <EditFormModal
        tableActionRef={actionRef}
        data={editData}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </PageContainer>
  )
}
