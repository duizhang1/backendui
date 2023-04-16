import React, {useEffect} from "react";
import {
  ModalForm,
  ProFormGroup,
  ProFormSelect,
  ProFormText, ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import {addPermission, getFatherPermissionTree, getPermissionById,editPermission} from "@/services/ant-design-pro/permission";
import {permissionTypeEnum} from '@/enum/enum'

export default function Index(props){
  const { tableActionRef,uuid,open,setOpen} = props
  const [form] = Form.useForm();

  useEffect(()=>{
    if (!uuid || uuid === '' || open === false){
      return
    }
    getPermissionById({uuid: uuid}).then(
      value => {
        const data = value.data
        form.setFieldValue("pid",data.pid)
        form.setFieldValue("name",data.name)
        form.setFieldValue("value",data.value)
        form.setFieldValue("type",data.type)
        form.setFieldValue("uri",data.uri)
      },
      reason => {

      }
    )
  },[uuid,open])

  return (
    <ModalForm
      title={"编辑权限"}
      modalProps={{
        open: open,
        destroyOnClose: true,
        onCancel: ()=>{
          setOpen(false)
          form.resetFields()
        },
        maskClosable: false,
      }}
      form={form}
      autoFocusFirstInput
      onFinish={async (values) => {
        const params = {
          ...values,
          uuid: uuid
        }
        const result = await editPermission(params)
        if (result.code === '200'){
          message.info(result.message)
          tableActionRef.current.reload()
          tableActionRef.current.clearSelected()
          form.resetFields()
          setOpen(false)
        }
        return false;
      }}
    >
      <ProFormGroup >
        <ProFormTreeSelect
          label={"父级菜单项"}
          name={'pid'}
          dependencies={['type']}
          request={async () =>{
            const result = await getFatherPermissionTree()
            return result.data
          }}
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
          }}
          rules={[
            ({getFieldValue}) => ({
              validator(_,value) {
                // 当选择功能时，需要选择对应的页面
                if (getFieldValue('type') === '1' && (!value || value?.length === 0)){
                  return Promise.reject(new Error('功能创建需要在对应的父级页面上'))
                }
                return Promise.resolve()
              }
            })
          ]}
          width="md"
          allowClear
        />
        <ProFormText
          width="md"
          name="name"
          label="权限名"
          rules={[
            {
              required: true,
              message: "请输入权限名"
            }
          ]}
        />
        <ProFormText
          width="md"
          name="value"
          label="权限值"
          rules={[
            {
              required: true,
              message: "请输入权限值"
            }
          ]}
        />
        <ProFormSelect
          width="md"
          name="type"
          label="类型"
          valueEnum={permissionTypeEnum}
          rules={[
            {
              required: true,
              message: "请选择类型"
            }
          ]}
        />
        <ProFormText
          width="md"
          name="uri"
          label="权限路径"
          rules={[
            {
              required: true,
              message: "请输入权限路径"
            }
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  )
}
