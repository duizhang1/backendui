import React from "react";
import {PageContainer,ProTable} from "@ant-design/pro-components";
import {Button, message, Modal} from "antd";
import {useRef, useState} from "react";
import {approveStateEnum} from "@/enum/enum";
import {getAdminReviewed} from "@/services/ant-design-pro/article";
import ArticleOperationModal from './components/ArticleOperationModal'
import {history} from "@@/core/history";

export default function Index (){

  const actionRef = useRef()

  const [selectedRows,setSelectedRows] = useState([])

  const [operationListOpen,setOperationListOpen] = useState(false)
  const [listUuid,setListUuid] = useState('');

  const [modal, contextHolder] = Modal.useModal();

  const columns = [
    {
      title: 'uuid',
      dateIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '文章标题',
      dataIndex: 'title',
    },
    {
      title: 'creator_id',
      dataIndex: 'creator_id',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '创作者',
      dataIndex: 'creatorName',
      hideInSearch: true,
    },
    {
      title: '当前审核状态',
      dataIndex: 'approve_state',
      hideInSearch: true,
      valueEnum: approveStateEnum,
    },
    {
      title: 'approve_admin',
      dataIndex: 'approve_admin',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '最后审核人员',
      dataIndex: 'adminName',
      hideInSearch: true,
    },
    {
      title: '审核提示',
      dataIndex: 'approve_tip',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      hideInSearch: true,
    },
  ]

  const clickOnOperationList = (e) => {
    if (selectedRows.length === 0 || selectedRows.length > 1){
      message.error("请选择一条记录")
      return
    }
    setListUuid(selectedRows[0].uuid)
    setOperationListOpen(true)
  }

  const onDoubleClick = (e,record) => {
    history.push({pathname: '/articleInfo', query: {id: record.uuid}})
    e.stopPropagation()
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        headerTitle="已审核文章"
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        request={async (
          params,sort,filter
        ) => {
          const value = await getAdminReviewed(params);
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
            onClick={clickOnOperationList}
          >
            查看操作记录
          </Button>,
        ]}
        onRow={record => {
          return {
            onClick: event => {}, // 点击行
            onDoubleClick: e => {onDoubleClick(e,record)},
            onContextMenu: event => {},
            onMouseEnter: event => {}, // 鼠标移入行
            onMouseLeave: event => {},
          };
        }}
      />
      <ArticleOperationModal
        open={operationListOpen}
        setOpen={setOperationListOpen}
        articleId={listUuid}
      />
    </PageContainer>
  )
}
