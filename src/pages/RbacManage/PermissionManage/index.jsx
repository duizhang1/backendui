import React from "react";
import {ProTable} from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import {getPermissionData} from "@/services/ant-design-pro/rbac";


const statusEnum = {
  0: { text: '禁用', status: 'Error' },
  1: {
    text: '启用',
    status: 'Success',
  },
}

export default function index() {

  const column = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'id',
      dataIndex: 'uuid',
      hideInTable: true,
    },
    {
      title: '父级权限ID',
      dataIndex: 'pid',
      hideInTable: true,
    },
    {
      title: '父级权限名称',
      dataIndex: 'pidName',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '权限值',
      dataIndex: 'value'
    },
    {
      title: '权限类型',
      dataIndex: 'type'
    },
    {
      title: '前端资源路径',
      dataIndex: 'uri'
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      valueEnum: statusEnum,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    }
  ]

  return (
    <ProTable
      column={column}
      request={getPermissionData}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      headerTitle="权限列表"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  )

}
