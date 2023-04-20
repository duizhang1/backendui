import React from "react";
import {Button, Form, message} from "antd";
import {ModalForm, ProFormGroup, ProFormText} from "@ant-design/pro-components";
import {articleReviewPass} from "@/services/ant-design-pro/article";

export default function Index(props){
  const { articleId,doAfter } = props
  const [form] = Form.useForm();

  return (
    <ModalForm
      title={"审核通过"}
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
          通过
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        try{
          const params = {
            ...values,
            articleId: articleId
          }
          const result = await articleReviewPass(params)
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
          name="score"
          label="分数"
          rules={[
            {
              required: true,
              message: "请输入分数"
            }
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  )
}
