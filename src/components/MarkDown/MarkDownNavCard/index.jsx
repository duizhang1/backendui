import React from 'react'
import { Card } from 'antd'
import MarkdownNavbar from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css';

export default function MarkDownNavCard (props) {
  const { content } = props

  return (
    <div style={{
      width: '100%'
    }}>
      <Card title='目录' bodyStyle={{ padding: '5px',width: '18vw' }}>
        <MarkdownNavbar
          source={content}
          className="article-menu"
        />
      </Card>
    </div>
  )
}
