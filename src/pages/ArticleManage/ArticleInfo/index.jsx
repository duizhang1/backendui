import React, {useEffect, useState} from "react";
import {Affix, PageHeader,Button} from "antd";
import MarkDownCom from "@/components/MarkDown/MarkDownCom";
import MarkDownNavCard from "@/components/MarkDown/MarkDownNavCard";
import {getArticleInfo} from "@/services/ant-design-pro/article";
import {history} from "umi";
import BackModalForm from './components/BackModalForm'

export default function Index(props) {
  const [data, setData] = useState({})
  useEffect(() => {
    getArticleInfo({uuid: props.location.query.id}).then(
      value => {
        setData(value.data)
      }
    )
  }, [props.location.query.id])

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          history.goBack()
        }}
        title={data.title}
        subTitle={`创作者: ${data.username}`}
        style={{
          marginTop: '-30px'
        }}
        extra={[
          <BackModalForm key={'1'} articleId={props.location.query.id} doAfter={()=>{}}/>,
        ]}
      />
      <div style={{
        display: 'flex',
        width: '100%',
        marginTop: '-5px'
      }}>
        <div
          style={{width: '75%'}}
        >
          <div style={{
            backgroundColor: '#fff',
            width: '100%',
            padding: '30px',
            borderRadius: '15px',
          }}>
              <div>
                {
                  data.img && data.img.length > 0 && data.img !== '-' ?
                    (
                      <img src={data.img} alt="" style={{
                        width: '100%',
                        marginBottom: '20px'
                      }}/>
                    ) :
                    ('')
                }
              </div>
            <MarkDownCom content={data.content}/>
          </div>
        </div>
        <div style={{
          marginLeft: '15px',
          borderRadius: '15px',
        }}>
          <Affix offsetTop={50}>
            <MarkDownNavCard content={data.content}/>
          </Affix>
        </div>
      </div>
    </>
  )

}
