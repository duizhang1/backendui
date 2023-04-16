import React from "react";
import { Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import {useEffect} from "react";
import {editSort} from "@/services/ant-design-pro/sort";

export default function Index(props){

  const { tableActionRef,data,editOpen,setEditOpen } = props
  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldValue('sortName',data.sortName)
    form.setFieldValue('routeName',data.routeName)
  },[data, form, editOpen])

  return (
    <ModalForm
      title={"修改分区"}
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
        const result = await editSort(params)
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
