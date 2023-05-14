import React from "react";
import {Access} from "@@/plugin-access/access";
import {Button} from "antd";

export default function Index(props){
  const {onClick,children,access,type='primary'} = props

  return (
    <Access accessible={access}>
      <Button onClick={onClick} type={type} >{children}</Button>
    </Access>
  )

}
