import React, {useEffect, useState} from "react";
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker, ProFormGroup,
  ProFormSelect,
  ProFormText, ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, message, TreeSelect } from 'antd';
import {getFatherPermissionTree} from "@/services/ant-design-pro/system";

export default function Index(){
  const [value,setValue] = useState([])
  const [treeData,setTreeData] = useState([])
  const [form] = Form.useForm();

  useEffect(()=>{
    getFatherPermissionTree().then(
      values => {
        setTreeData(values.data)
      },
      reason => {

      }
    )
  },[])

  const onChange = (e) =>{
    setValue(e)
  }

  return (
    <ModalForm
      title={"新增权限"}
      form={form}
      trigger={
        <Button type="primary">
          新增
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
      >
      <ProFormGroup >
        <ProFormTreeSelect
          label={"父级菜单项"}
          name={'pid'}
          request={async () =>{
            const result = await getFatherPermissionTree()
            return result.data
          }}
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
          }}
          style={{
            width: '100%',
          }}
          width={300}
          // value={value}
          // dropdownStyle={{
          //   maxHeight: 400,
          //   overflow: 'auto',
          // }}
          // placeholder="Please select"
          // treeDefaultExpandAll
          // treeData={treeData}
          // onChange={onChange}
        />
      </ProFormGroup>
    </ModalForm>
  )
}
