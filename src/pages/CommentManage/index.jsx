import React from "react";
import {PageContainer,ProTable} from "@ant-design/pro-components";
import {getCommentPage} from "@/services/ant-design-pro/articleComment";
import {useRef, useState} from "react";
import {Avatar, Button, message, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {deletePermission} from "@/services/ant-design-pro/permission";

export default function Index(){

  const actionRef = useRef()

  const [modal, contextHolder] = Modal.useModal();
  const [selectedRows,setSelectedRows] = useState([])

  const columns = [
    {
      title: 'uuid',
      dataIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '评论内容',
      dataIndex: 'comment',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '点赞数',
      dataIndex: 'likeNumber',
      hideInSearch: true,
    },
    {
      title: '子评论数',
      dataIndex: 'childSize',
      hideInSearch: true,
    },
    {
      title: '评论链接',
      dataIndex: 'articleId',
      render: (text,record,index,action) =>{
        return (<a href={`localhost:8000/${text}`} target="_blank" rel="noreferrer">链接</a> )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
  ]

  const clickOnDelete = (e) =>{
    if (selectedRows.length === 0){
      message.error("请至少选择一条记录")
      return
    }
    modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: `确认删除这${selectedRows.length}条评论吗？`,
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

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        search={false}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        headerTitle="评论列表"
        columns={columns}
        request={async (
          params, sort, filter
        ) => {
          const value = await getCommentPage(params);
          return {
            data: value.data.data,
            success: value.code === '200',
            total: value.data.total
          }
        }}
        rowKey={"uuid"}
        toolBarRender={() => [
          <Button type={'primary'} key={'1'} onClick={clickOnDelete}>
            删除
          </Button>
        ]}
      />
      {contextHolder}
    </PageContainer>
  )

}
