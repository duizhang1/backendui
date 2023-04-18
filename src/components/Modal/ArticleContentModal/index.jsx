import React from "react";
import {Modal,Affix} from "antd";
import MarkDownCom from "@/components/MarkDown/MarkDownCom";
import MarkDownNavCard from "@/components/MarkDown/MarkDownNavCard";

export default function Index(props){

  const {data,open,setOpen} = props

  return (
    <Modal
      title={'文章详情'}
      open={open}
      onCancel={(e) => {setOpen(false)}}
      maskClosable={false}
    >
      <div
        // style={{width: '300px',height: '200px'}}
      >
        <div style={{
          backgroundColor: '#fff',
          width: '830px',
          padding: '30px',
          borderRadius: '15px',
        }}>
          <div>
            <h1 style={{
              margin: '0 0 1.2rem',
              fontSize: '32px',
              fontWeight: '600',
              lineHeight: '1.31',
              color: '#252933'
            }}
            >
              {data.title}
            </h1>
            <div>
              {
                data.img && data.img.length > 0 && data.img !== '-' ?
                  (
                    <img src={data.img} alt="" style={{
                      width: '100%',
                      marginBottom: '20px'
                    }}/>
                  ) :
                  ( '' )
              }
            </div>
          </div>
          <MarkDownCom content={data.content} />
        </div>
      </div>
      <div style={{
        marginLeft: '15px'
      }}>
        <Affix offsetTop={0}>
          <MarkDownNavCard content={data.content} />
        </Affix>
      </div>
    </Modal>
  )

}
