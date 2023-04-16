import React from "react";
import { Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import {useEffect} from "react";
import {editLabel} from "@/services/ant-design-pro/label";

export default function Index(props){

  const { tableActionRef,data,editOpen,setEditOpen } = props
  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldValue('labelName',data.labelName)
  },[data, form, editOpen])

  return (
    <ModalForm
      title={"修改标签"}
      modalProps={{
        open: editOpen,
        destroyOnClose: true,
        onCancel: ()=>{
          setEditOpen(false)
        },
        maskClosable: false,
      }}
      form={form}
      autoFocusFirstInput
      onFinish={async (values) => {
        const params = {
          ...values,
          uuid: data.uuid
        }
        const result = await editLabel(params)
        if (result.code === '200'){
          debugger
          message.info(result.message)
          tableActionRef.current.reload()
          tableActionRef.current.clearSelected()
          form.resetFields()
          setEditOpen(false)
          return true;
        }
        return false;
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
