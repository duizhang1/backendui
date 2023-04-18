import React from "react";
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {Button, Modal, Image} from "antd";
import {useRef, useState} from "react";
import {getList} from "@/services/ant-design-pro/article";
import {history} from "umi";

export default function Index(){

  const [modal, contextHolder] = Modal.useModal();
  const [selectedRows,setSelectedRows] = useState([])
  const [infoOpen,setInfoOpen] = useState(false)
  const [infoData,setInfoData] = useState({})

  const actionRef = useRef()

  const columns = [
    {
      title: 'uuid',
      dateIndex: 'uuid',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '封面',
      dataIndex: 'img',
      hideInSearch: true,
      render: (text,record,index,action) =>{
        return text != null && text.length > 0 && text !== '-'
          ? <Image
            style={{
              maxWidth: '250px',
              maxHeight: '120px',
              verticalAlign: 'middle',
              minWidth: '120px'
            }}
            alt="加载图片失败"
            src={text}
          />
          : <span>{text}</span>
      }
    },
    {
      title: '总结',
      dataIndex: 'summary',
      hideInSearch: true,
    },
    {
      title: '正文',
      dataIndex: 'content',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建者ID',
      dataIndex: 'creatorId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '作者',
      dataIndex: 'username',
      hideInSearch: true,
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

  const onDoubleClick = (e,record) => {
    // setInfoData(record)
    // setInfoOpen(true)
    history.push({pathname: '/articleInfo', query: {id: record.uuid}})
    e.stopPropagation()
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
        headerTitle="文章列表"
        onRow={record => {
          return {
            onClick: event => {}, // 点击行
            onDoubleClick: e => {onDoubleClick(e,record)},
            onContextMenu: event => {},
            onMouseEnter: event => {}, // 鼠标移入行
            onMouseLeave: event => {},
          };
        }}
        rowKey={"uuid"}
      />
    </PageContainer>
  )
}
