import React from "react";
import {Button, Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import {addLabel} from "@/services/ant-design-pro/label";

export default function Index(props){

  const { tableActionRef } = props
  const [form] = Form.useForm();

  return (
    <ModalForm
      title={"新增标签"}
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
          const result = await addLabel(values)
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
          name="labelName"
          label="标签名"
          rules={[
            {
              required: true,
              message: "请输入标签名"
            }
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  )

}
