import React, {useEffect, useState} from "react";
import {PageContainer,ProCard,ModalForm} from "@ant-design/pro-components";
import {Button,Descriptions,message} from 'antd'
import MarkDownCom from "@/components/MarkDown/MarkDownCom";
import MarkdownNavbar from "markdown-navbar";
import 'markdown-navbar/dist/navbar.css';
import {getReviewArticle} from "@/services/ant-design-pro/article";
import {getUserById} from "@/services/ant-design-pro/user";
import PassModalForm from './components/PassModalForm'
import RejectModalForm from './components/RejectModalForm'

export default function Index(props){

  const [articleData,setArticleData] = useState({})
  const [userData,setUserData] = useState({})

  function getPageData() {
    getReviewArticle().then(
      value => {
        setArticleData(value.data);
        getUserById({userId:value.data?.creatorId}).then(
          values => {
            setUserData(values.data)
          }
        )
      },
      reason => {
        setArticleData({content: '# 暂无可审核的文章'})
        setUserData({})
      }
    )
  }

  useEffect(()=>{
    getPageData()
  },[])

  const onClickNext = (e) =>{
    getReviewArticle().then(
      value => {
        if (value.data.uuid === articleData.uuid){
          message.info('请先审核当前文章')
        }else{
          getPageData()
        }
      }
    )
  }

  const doAfterPassOrReject = (e) =>{
    getPageData()
  }

  return (
    <PageContainer
      header={{
        title: '文章审核',
        breadcrumb: {},
        extra: [
          <PassModalForm articleId={articleData.uuid} doAfter={doAfterPassOrReject}/>,
          <RejectModalForm articleId={articleData.uuid} doAfter={doAfterPassOrReject}/>,
          <Button key="3" onClick={onClickNext}>下一篇</Button>,
        ]
      }}
      content={
        <Descriptions column={2} style={{ marginBlockEnd: -16 }}>
          <Descriptions.Item label="作者">{userData.username}</Descriptions.Item>
          <Descriptions.Item label="标题">{articleData.title}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{articleData.createTime}</Descriptions.Item>
          <Descriptions.Item label="上次拒绝理由">{articleData.approveTip}</Descriptions.Item>
        </Descriptions>
      }
    >
      <ProCard ghost split="vertical">
        <ProCard colSpan={18} style={{ height: '100%' }} >
          <MarkDownCom content={articleData.content} />
        </ProCard>
        <ProCard colSpan={6} style={{ height: '100%' }} >
          <MarkdownNavbar
            source={articleData.content}
            className="article-menu"
          />
        </ProCard>
      </ProCard>

    </PageContainer>
  )

}
