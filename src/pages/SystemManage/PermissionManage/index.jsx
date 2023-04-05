import React, {useState} from "react";
import {ActionType, ProTable, PageContainer} from "@ant-design/pro-components";
import {Button, Dropdown, Space, Tag, Table } from 'antd';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import {getPermissionData} from "@/services/ant-design-pro/system";
import {useRef} from "react";
import {FormattedMessage} from "@@/plugin-locale/localeExports";
import {permissionTypeEnum, statusEnum} from "@/enum/enum";
import AddFormModal from './components/AddFormModal'


export default function Index() {
  const [selectedRows,setSelectedRows] = useState([])

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

  return (
    <PageContainer>
      <ProTable
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
          />,
        ]}
      />
    </PageContainer>
  )

}
