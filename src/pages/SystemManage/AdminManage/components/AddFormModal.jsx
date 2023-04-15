import React from "react";
import {Button, Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import {addAdmin} from "@/services/ant-design-pro/admin";

export default function Index(props){

  const { tableActionRef } = props
  const [form] = Form.useForm();

  return (
    <ModalForm
      title={"新增管理员"}
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
        const result = await addAdmin(values)
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
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入用户名"
            }
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  )

}
