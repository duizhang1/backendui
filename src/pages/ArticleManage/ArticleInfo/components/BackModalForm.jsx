import React from "react";
import {Button, Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import {articleReviewFailed, articleReviewPass} from "@/services/ant-design-pro/article";

export default function Index(props){
  const { articleId,doAfter } = props
  const [form] = Form.useForm();

  return (
    <ModalForm
      title={"打回"}
      modalProps={{
        destroyOnClose: true,
        onCancel: ()=>{
          form.resetFields()
        },
        maskClosable: false,
      }}
      form={form}
      trigger={
        <Button>
          打回
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        try{
          const params = {
            ...values,
            articleId: articleId
          }
          const result = await articleReviewFailed(params)
          message.info(result.message)
          doAfter()
          return true;
        }catch (err){

        }
      }}
    >
      <ProFormGroup >
        <ProFormText
          width="md"
          name="approveTip"
          label="打回理由"
          rules={[
            {
              required: true,
              message: "请输入打回理由"
            }
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  )
}
