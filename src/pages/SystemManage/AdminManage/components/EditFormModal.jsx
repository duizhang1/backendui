import React from "react";
import { Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import { editAdmin} from "@/services/ant-design-pro/admin";
import {useEffect} from "react";

export default function Index(props){

  const { tableActionRef,data,editOpen,setEditOpen } = props
  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldValue('username',data.username)
    form.setFieldValue('nickName',data.nickName)
    form.setFieldValue('note',data.note)
  },[data, form, editOpen])

  return (
    <ModalForm
      title={"修改管理员"}
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
        const result = await editAdmin(params)
        if (result.code === '200'){
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
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入用户名"
            }
          ]}
        />
        <ProFormText
          width="md"
          name="nickName"
          label="昵称"
        />
        <ProFormText
          width="md"
          name="note"
          label="简介"
        />
      </ProFormGroup>
    </ModalForm>
  )

}
