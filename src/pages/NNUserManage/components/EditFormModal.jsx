import React from "react";
import { Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText,ProFormSelect} from "@ant-design/pro-components";
import {useEffect} from "react";
import {editUser} from "@/services/ant-design-pro/user";
import {sexEnum} from "@/enum/enum";

export default function Index(props){

  const { tableActionRef,data,editOpen,setEditOpen } = props
  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldValue('username',data.username)
    form.setFieldValue('emailAddress',data.emailAddress)
    form.setFieldValue('sex',data.sex)
    form.setFieldValue('companyName',data.companyName)
    form.setFieldValue('position',data.position)
    form.setFieldValue('personProfile',data.personProfile)
  },[data, form, editOpen])

  return (
    <ModalForm
      title={"修改用户信息"}
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
        const result = await editUser(params)
        if (result.code === '200'){
          debugger
          message.info(result.message)
          tableActionRef.current.clearSelected()
          tableActionRef.current.reload()
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
          name="emailAddress"
          label="邮箱"
          rules={[
            {
              required: true,
              message: "请输入邮箱"
            }
          ]}
          disabled={true}
        />
        <ProFormSelect
          name="sex"
          label="性别"
          valueEnum={sexEnum}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          width="md"
          name="companyName"
          label="公司名"
        />
        <ProFormText
          width="md"
          name="position"
          label="职位"
        />
        <ProFormText
          width="md"
          name="personProfile"
          label="简介"
        />
      </ProFormGroup>
    </ModalForm>
  )

}
