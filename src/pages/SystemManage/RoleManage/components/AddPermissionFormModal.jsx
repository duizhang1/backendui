import React from "react";
import {Button, Form, message, Modal, Tree} from "antd";

export default function Index(props){
  const {open,setOpen,uuid} = props
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={()=>{setOpen(false)}}

     >
      <Tree />
    </Modal>
  )
}
