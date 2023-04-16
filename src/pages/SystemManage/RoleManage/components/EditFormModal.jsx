import React, {useEffect} from "react";
import {Button, Form, message} from "antd";
import {addRole, editRole} from "@/services/ant-design-pro/role";
import {ModalForm, ProFormGroup, ProFormSelect, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";


export default function Index (props){
  const { tableActionRef,data,editOpen,setEditOpen } = props
  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldValue('name',data.name)
    form.setFieldValue('description',data.description)
  },[data, form, editOpen])

  return (
    <ModalForm
      title={"修改角色"}
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
        const result = await editRole(params)
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
