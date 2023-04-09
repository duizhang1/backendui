import React, {useState} from "react";
import {Button, Form, message} from "antd";
import {addRole} from "@/services/ant-design-pro/role";
import {ModalForm, ProFormGroup, ProFormSelect, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";


export default function Index (props){
  const { tableActionRef } = props
  const [form] = Form.useForm();

  return (
    <ModalForm
      title={"新增角色"}
      modalProps={{
        destroyOnClose: true,
        onCancel: ()=>{
          form.resetFields()
        },
        maskClosable: false,
      }}
      form={form}
      trigger={
        <Button type="primary">
          新增
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        const result = await addRole(values)
        if (result.code === '200'){
          message.info(result.message)
          tableActionRef.current.reload()
          form.resetFields()
          return true
        }
        return false;
      }}
    >
      <ProFormGroup >
        <ProFormText
          width="md"
          name="name"
          label="角色名"
          rules={[
            {
              required: true,
              message: "请输入角色名"
            }
          ]}
        />
        <ProFormText
          width="md"
          name="description"
          label="描述"
        />
      </ProFormGroup>
    </ModalForm>
  )
}
