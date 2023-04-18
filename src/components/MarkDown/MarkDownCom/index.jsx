import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import 'github-markdown-css'

export default function MarkDownCom (props) {
  const { content } = props

  return (
    <ReactMarkdown
      className='markdown-body'
      remarkPlugins={[remarkGfm, { singleTilde: false }]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code ({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match
            ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            )
            : (
              <code className={className} {...props}>
                {children}
              </code>
            )
        }
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
