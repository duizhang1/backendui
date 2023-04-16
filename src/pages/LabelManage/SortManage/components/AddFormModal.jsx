import React from "react";
import {Button, Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import {addSort} from "@/services/ant-design-pro/sort";

export default function Index(props){

  const { tableActionRef } = props
  const [form] = Form.useForm();

  return (
    <ModalForm
      title={"新增分区"}
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
        try{
          const result = await addSort(values)
          message.info(result.message)
          tableActionRef.current.reload()
          form.resetFields()
          return true;
        }catch (err){

        }
      }}
    >
      <ProFormGroup >
        <ProFormText
          width="md"
          name="sortName"
          label="分区名"
          rules={[
            {
              required: true,
              message: "请输入分区名"
            }
          ]}
        />
        <ProFormText
          width="md"
          name="routeName"
          label="分区路由"
          rules={[
            {
              required: true,
              message: "请输入分区路由"
            }
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  )

}
