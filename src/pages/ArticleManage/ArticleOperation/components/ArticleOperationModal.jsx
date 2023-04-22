import React, {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import {approveStateEnum} from "@/enum/enum";
import {ProTable} from "@ant-design/pro-components";
import {getArticleOperation} from "@/services/ant-design-pro/articleApproveOperation";
import {useRef} from "react";

export default function Index(props){
  const actionRef = useRef()

  const {open,setOpen,articleId} = props

  const columns = [
    {
      title: 'uuid',
      dataIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '管理员名称',
      dataIndex: 'adminName',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'approveState',
      valueEnum: approveStateEnum,
      hideInSearch: true,
    },
    {
      title: '审核提示',
      dataIndex: 'approveTip',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
  ]

  useEffect(()=>{
    actionRef.current?.reload()
  },[articleId])

  return (
    <Modal
      title={'文章审核记录'}
      open={open}
      footer={null}
      onCancel={()=>{setOpen(false)}}
      width={800}
    >
      <ProTable
        actionRef={actionRef}
        headerTitle="审核记录"
        columns={columns}
        search={false}
        rowKey={'uuid'}
        request={async (
          params,sort,filter
        ) => {
          if (!articleId || articleId === ''){
            return {
              data: [],
              success: false,
              total: 0
            }
          }
          const data = {
            ...params,
            articleId: articleId
          }
          const value = await getArticleOperation(data);
          return {
            data: value.data.data,
            success: value.code === '200',
            total: value.data.total
          }
        }}
      />
    </Modal>
  )
}
